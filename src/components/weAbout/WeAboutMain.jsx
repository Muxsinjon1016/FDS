import React from "react";
import Food from "../../../public/logo/Food.webp";
import QRCode from "../../../public/logo/QRCode.png"; // Ensure you have this image in your project

const WeAboutMain = () => {
  return (
    <div className="max-w-[1300px] mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        About Company
      </h1>
      <div className="flex justify-center">
        <div className="flex items-center border rounded-lg shadow-lg p-6">
          <img
            src={Food}
            alt="Company Logo"
            className="h-48 w-auto rounded-lg"
          />
          <img
            src={QRCode}
            alt="QR Code"
            className="h-48 w-48 ml-8 rounded-lg"
          />
        </div>
      </div>
      <p className="text-lg leading-relaxed text-gray-700 mt-8">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit amet
        earum maxime minus veniam dolores nostrum. Iste dolorem, dolores
        exercitationem dolorum, unde recusandae mollitia, nesciunt odio sint
        quia magnam maxime. In excepturi voluptatibus dicta id libero veniam
        explicabo vitae, assumenda possimus molestias repellat voluptatum iure
        dignissimos odio veritatis deserunt cumque eos a obcaecati expedita
        eveniet consequuntur quasi magni. Velit, impedit. Molestias, eius
        sapiente optio, debitis reiciendis ut perferendis itaque laborum
        perspiciatis omnis accusantium exercitationem quaerat, harum rem
        repellendus. Aliquid est sed facilis corrupti, minus quo dicta deserunt
        nihil praesentium voluptate? Consectetur, eaque. Minus harum libero
        aliquam nesciunt necessitatibus laudantium a fugiat cum accusantium
        quae, dolore quidem. Molestiae unde, eius magnam labore odit maxime
        accusantium libero ab dolores asperiores quod. Consectetur. Cupiditate
        delectus eaque incidunt fugit laudantium quod earum magnam hic eos
        reprehenderit tenetur deleniti doloremque beatae voluptatibus aut quasi
        amet, neque voluptatum pariatur, quos saepe soluta ad libero. Optio,
        similique? Libero voluptates culpa fugit sed reprehenderit sit neque
        facilis, ipsa id quod assumenda nam laboriosam nihil maxime! Doloribus
        officiis odit exercitationem ab commodi labore, enim illum delectus,
        quidem eius nulla! Aliquid, quia voluptatem voluptatibus optio qui cum
      </p>
    </div>
  );
};

export default WeAboutMain;
