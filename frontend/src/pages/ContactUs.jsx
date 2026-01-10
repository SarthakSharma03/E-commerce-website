import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoCallOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { contactSchema } from "../validation/contactValidation";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto ">
         <p className="text-sm text-gray-400 mb-6 pt-5 pb-3.5">
          Home <span className="mx-1">/</span>
          <span className="text-gray-700 font-medium">Contact</span>
        </p>

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-sm ">
        
          <div className="space-y-8">
         
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white">
                <IoCallOutline />

              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Call To Us</h3>
                <p className="text-gray-500 text-sm">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="mt-2 text-gray-700 text-sm">
                  Phone: <span className="font-medium">+8801611112222</span>
                </p>
              </div>
            </div>

            <hr />

          
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white">
                <BsEnvelope  />

              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Write To Us</h3>
                <p className="text-gray-500 text-sm">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="mt-2 text-gray-700 text-sm">
                  Emails: customer@exclusive.com
                </p>
                <p className="text-gray-700 text-sm">
                  Emails: support@exclusive.com
                </p>
              </div>
            </div>
          </div>

       
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
 
    console.log("Form Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Your Name *"
            {...register("name")}
            className={`w-full rounded-md bg-gray-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
              errors.name ? "focus:ring-red-500 border-red-500 border" : "focus:ring-red-500"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email *"
            {...register("email")}
            className={`w-full rounded-md bg-gray-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500 border-red-500 border" : "focus:ring-red-500"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Your Phone *"
            {...register("phone")}
            className={`w-full rounded-md bg-gray-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
              errors.phone ? "focus:ring-red-500 border-red-500 border" : "focus:ring-red-500"
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows="6"
          {...register("message")}
          className={`w-full rounded-md bg-gray-100 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 ${
            errors.message ? "focus:ring-red-500 border-red-500 border" : "focus:ring-red-500"
          }`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-md transition disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
