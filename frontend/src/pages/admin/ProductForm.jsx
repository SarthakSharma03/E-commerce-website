import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../service/Api';
import { toast } from 'react-toastify';
import { MdCloudUpload, MdDelete } from 'react-icons/md';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    oldPrice: '',
    discount: '',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setFetching(true);
      try {
        const response = await Api.getProductById(id);
        if (response.success) {
          const product = response.data;
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            oldPrice: product.oldPrice || '',
            discount: product.discount || '',
          });
          setExistingImages(product.images);
        }
      } catch {
        toast.error('Failed to load product details');
      } finally {
        setFetching(false);
      }
    };

    if (isEditMode) {
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if ((key === 'oldPrice' || key === 'discount') && formData[key] === '') {
        data.append(key, 0);
      } else {
        data.append(key, formData[key]);
      }
    });
    images.forEach((image) => {
      data.append('image', image);
    });

    try {
      if (isEditMode) {
        await Api.updateProduct(id, data);
        toast.success('Product updated successfully');
      } else {
        await Api.createProduct(data);
        toast.success('Product created successfully');
      }
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-6">Loading product data...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select Category</option>
              <option value="computer">computer</option>
              <option value="phone">phone</option>
              <option value="smartWatch">smartWatch</option>
              <option value="Camera">Camera</option>
              <option value="Headphone">Headphone</option>
              <option value="Gaming">Gaming</option>
              <option value="Woman’s Fashion">Woman’s Fashion</option>
              <option value="Men’s Fashion">Men’s Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Lifestyle">Home & Lifestyle</option>
              <option value="Medicine">Medicine</option>
              <option value="Sports & Outdoor">Sports & Outdoor</option>
              <option value="Baby’s & Toys">Baby’s & Toys</option>
              <option value="Groceries & Pets">Groceries & Pets</option>
              <option value="Health & Beauty">Health & Beauty</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Old Price (Optional)</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <MdCloudUpload className="mx-auto text-gray-400 mb-2" size={40} />
            <p className="text-gray-500">Click or drag images here to upload</p>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4">
         
            {existingImages.map((img, index) => (
              <div key={`existing-${index}`} className="relative w-24 h-24 border rounded overflow-hidden">
                <img src={img} alt="Product" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">Existing</span>
              </div>
            ))}
            
            {/* New Images */}
            {images.map((file, index) => (
              <div key={index} className="relative w-24 h-24 border rounded overflow-hidden group">
                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MdDelete size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
