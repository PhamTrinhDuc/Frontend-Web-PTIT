import { SlScreenSmartphone } from "react-icons/sl";
import { BsSmartwatch } from "react-icons/bs";
import { FaCamera, FaHeadphonesAlt, FaTabletAlt, FaLaptopCode } from "react-icons/fa";
import { MdVideogameAsset, MdOutlineMonitor } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa6";

export const categoryIcons = {
    "phone": <SlScreenSmartphone className="icon-category"/>,
    "laptop": <FaLaptopCode className="icon-category" />,
    "camera": <FaCamera className="icon-category"  />,
    "smart-watches": <BsSmartwatch className="icon-category" />,
    "gamming": <MdVideogameAsset className="icon-category"/>,
    "headphone": <FaHeadphonesAlt className="icon-category"/>,
    "tablet": <FaTabletAlt className="icon-category"/>,
    "monitor": <MdOutlineMonitor className="icon-category"/>,
    "keyboard": <FaKeyboard className="icon-category"/>
};
