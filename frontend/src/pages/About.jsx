import StatCard from "../components/StatCard";
import TeamCard from "../components/TeamCard";
import FeatureCard from "../components/FeatureCard";
import { GrDeliver } from "react-icons/gr";
import { FaHeadphones } from "react-icons/fa6";
import { SiMoneygram } from "react-icons/si";
import { HiUsers } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { BsCoin } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";


const About = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Breadcrumb */}
      <p className="mb-6 text-sm text-gray-400">Home / About</p>

      {/* Our Story */}
      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
          <p className="text-gray-600">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            marketplace. We support buyers and sellers with trusted services and
            serve millions of customers across the region.
            <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            velit dolores eos distinctio sequi, nihil sapiente nemo quasi
            quibusdam nesciunt ea quis omnis nisi voluptatem officia, alias
            ipsam quia ad! Asperiores tempore nisi illum eveniet modi, iure
            doloribus, cumque aliquid repellat sed itaque incidunt similique
            debitis nesciunt eligendi consectetur non!
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            totam incidunt quasi! Quaerat vitae officiis, consectetur, nostrum
            at odio eveniet voluptatum exercitationem culpa voluptatibus illum
            voluptatem tempora? A, hic culpa.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322"
          alt="Our Story"
          className="rounded-lg"
        />
      </section>

      {/* Stats */}
      <section className="my-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <StatCard icon={<AiOutlineShop />} value="10.5k" label="Sellers active on site" />
        <StatCard
          icon={<BsCoin />}
          value="33k"
          label="Monthly Product Sale"
          highlight
        />
        <StatCard icon={<HiUsers />} value="45.5k" label="Customers active on site" />
        <StatCard icon={<TbMoneybag />} value="25k" label="Annual gross sale" />
      </section>

      {/* Team */}
      <section className="my-20">
        <div className="grid gap-10 md:grid-cols-3">
          <TeamCard
            image="https://randomuser.me/api/portraits/men/32.jpg"
            name="Tom Cruise"
            role="Founder & Chairman"
          />
          <TeamCard
            image="https://randomuser.me/api/portraits/women/44.jpg"
            name="Emma Watson"
            role="Managing Director"
          />
          <TeamCard
            image="https://randomuser.me/api/portraits/men/45.jpg"
            name="Will Smith"
            role="Product Designer"
          />
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-8 md:grid-cols-3">
        <FeatureCard
          icon={<GrDeliver />}
          title="FREE AND FAST DELIVERY"
          description="Free delivery for all orders over $140"
        />
        <FeatureCard
          icon={<FaHeadphones />}
          title="24/7 CUSTOMER SERVICE"
          description="Friendly 24/7 customer support"
        />
        <FeatureCard
          icon={<SiMoneygram />}
          title="MONEY BACK GUARANTEE"
          description="We return money within 30 days"
        />
      </section>
    </div>
  );
};

export default About;
