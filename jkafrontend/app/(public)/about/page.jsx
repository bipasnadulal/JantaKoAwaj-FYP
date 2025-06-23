import React from "react";
import SchoolIcon from '@mui/icons-material/School';
import YardIcon from '@mui/icons-material/Yard';
import SecurityIcon from '@mui/icons-material/Security';


const categories = [
  {
    name: "Education",
    icon: <SchoolIcon style={{ fontSize: 40 }} />,
    description: "Complaints related to schools, colleges, and educational institutions.",
  },
  {
    name: "Environment",
    icon: <YardIcon style={{ fontSize: 40 }} />,
    description: "Issues about pollution, greenery, and environmental protection.",
  },
  {
    name: "Municipal Guard",
    icon: <SecurityIcon style={{ fontSize: 40 }} />,
    description: "Concerns regarding Nagar Prahari and local safety enforcement.",
  },
  {
    name: "Agriculture and Livestock",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#000000" id="Cow--Streamline-Phosphor" height={34} width={34} ><desc>{"\n    Cow Streamline Icon: https://streamlinehq.com\n  "}</desc><path d="M6.43120625 12.4433125c0 0.28869375 -0.23405 0.52273125 -0.52274375 0.52274375H4.86298125c-0.4024125 0 -0.6539125 -0.43561875 -0.4527125 -0.7841125 0.093375 -0.16173125 0.2659625 -0.26136875 0.4527125 -0.261375h1.04548125c0.28869375 0.0000125 0.52274375 0.23405 0.52274375 0.52274375Zm4.7046875 -0.52274375h-1.0454875c-0.40240625 0 -0.6539125 0.43561875 -0.45270625 0.78411875 0.093375 0.161725 0.26595625 0.2613625 0.45270625 0.26136875h1.0454875c0.40240625 -0.00001875 0.6539125 -0.43565 0.45269375 -0.7841375 -0.09338125 -0.161725 -0.26594375 -0.26135 -0.45269375 -0.26135Zm-4.96605625 -3.13645625c0.6036125 -0.000025 0.980875 -0.65346875 0.67904375 -1.1762 -0.30183125 -0.52273125 -1.05634375 -0.52269375 -1.358125 0.0000625 -0.0688125 0.11919375 -0.10503125 0.25439375 -0.10503125 0.392025 0 0.43306875 0.35104375 0.78413125 0.7841125 0.7841125Zm3.6592 0c0.60360625 -0.000025 0.98086875 -0.65346875 0.67904375 -1.1762 -0.30183125 -0.52273125 -1.05634375 -0.52269375 -1.358125 0.0000625 -0.0688125 0.11919375 -0.1050375 0.25439375 -0.1050375 0.392025 0 0.43306875 0.35105 0.78413125 0.78411875 0.7841125Zm5.77565 -0.90695625c-0.1985125 0.2431 -0.49574375 0.38415625 -0.8096 0.3842125h-2.09096875v2.090975c1.60963125 1.20721875 1.30879375 3.7042125 -0.54150625 4.49458125 -0.32458125 0.13864375 -0.67376875 0.21011875 -1.02671875 0.2101H4.86298125c-2.0120375 0.00009375 -3.26954375 -2.17794375 -2.26360625 -3.92046875 0.17646875 -0.305675 0.4130125 -0.57244375 0.695375 -0.7842125v-2.090975H1.20378125c-0.6553125 -0.00106875 -1.1481 -0.59781875 -1.02523125 -1.2415125 0.34555 -1.70806875 1.8453 -2.93715 3.587975 -2.940425h0.1071625C3.16893125 3.3924625 2.7716375 2.44989375 2.77200625 1.46571875c0 -0.4024125 0.43561875 -0.6539125 0.78411875 -0.4527125 0.1617375 0.09338125 0.26136875 0.26595 0.26136875 0.4527125 0 1.44355625 1.17015625 2.613775 2.6137125 2.6137125h3.13645625c1.4435125 0 2.6137125 -1.1702 2.6137125 -2.6137125 0 -0.4024125 0.43561875 -0.6539125 0.78411875 -0.4527125 0.16173125 0.09338125 0.26136875 0.26595 0.26136875 0.4527125 0.00036875 0.984175 -0.396925 1.92674375 -1.10168125 2.6137125h0.1071625c1.742675 0.003275 3.242425 1.23235 3.587975 2.940425 0.0601 0.3036375 -0.019025 0.61823125 -0.21563125 0.8573ZM4.3402375 9.881875c0.1720875 -0.03469375 0.34719375 -0.0522 0.52274375 -0.052275h6.2729125c0.17554375 0.000075 0.35065625 0.01758125 0.5227375 0.052275v-3.18873125c0 -0.86608125 -0.70214375 -1.5681875 -1.568225 -1.56823125H5.9084625c-0.86613125 -0.0000375 -1.568225 0.70209375 -1.568225 1.56823125ZM3.29475 7.2158875v-0.52274375c-0.0009 -0.565675 0.18261875 -1.11623125 0.52274375 -1.56823125h-0.052275c-1.24140625 0.002025 -2.31093125 0.87510625 -2.5614375 2.090975Zm9.40936875 5.227425c0 -0.86608125 -0.70214375 -1.5681875 -1.568225 -1.568225H4.86298125c-1.207225 0 -1.9617375 1.30685625 -1.358125 2.3523375 0.28014375 0.4852375 0.797825 0.78414375 1.358125 0.78411875h6.2729125c0.86610625 0 1.568225 -0.702125 1.568225 -1.56823125Zm2.09096875 -5.227425c-0.25028125 -1.21600625 -1.31994375 -2.08920625 -2.5614375 -2.090975h-0.052275c0.340125 0.452 0.52364375 1.00255625 0.52274375 1.56823125v0.52274375Z" strokeWidth={0.0625} /></svg>, 
    description: "Complaints related to farming, livestock, and rural services.",
  },
  {
    name: "Public Infrastructure",
    icon: <svg id="Construction-Crane--Streamline-Atlas" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" height={36} width={36} ><desc>{"\n    Construction Crane Streamline Icon: https://streamlinehq.com\n  "}</desc><defs /><path d="m5.706250000000001 14.087499999999999 -2.4 0 0 -10.181249999999999 0 -2.99375 2.4 0 0 13.174999999999999z" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m0.9125 3.90625 13.174999999999999 0 0 -0.6L5.706250000000001 0.9125l-2.4 0 -2.39375 2.39375 0 0.6z" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m14.6875 14.087499999999999 -14.375 0" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="M12.887500000000001 3.90625v2.11875a1.1375 1.1375 0 0 0 0.5625 1.0187499999999998A1.2 1.2 0 1 1 11.693750000000001 8.125" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m5.706250000000001 10.493749999999999 -2.4 2.4" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m3.30625 7.5 2.4 2.39375" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m5.706250000000001 4.50625 -2.4 2.39375" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /></svg>,
    description: "Issues with roads, construction, and public maintenance.",
  },
];

export default function AboutPage(){
    return(
         <section className="w-full px-6 py-16 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          <strong>Janta ko Aawaj</strong> is an e-governance initiative designed to bridge the gap
          between citizens and government authorities through technology.
          Our platform enables users to raise real issues, gather support
          through public voting, and hold responsible offices accountable — all
          in a peaceful, trackable, and transparent way.
        </p>

        <p className="text-md text-gray-600 leading-relaxed mb-6">
          We believe that raising voices should not require protests on the streets.
          With <strong>Janta ko Aawaj</strong>, anyone can report genuine problems — from poor road
          conditions to broken water supply — and let others vote on them.
          As support grows, concerned authorities and news portals are alerted
          automatically based on predefined thresholds.
        </p>

        <p className="text-md text-gray-600 leading-relaxed mb-6">
          Our system uses machine learning to filter out fake/spam complaints
          and ensure that only real, verifiable issues reach the spotlight.
          Citizens can track progress on complaints, view government responses,
          and stay informed — all in one platform.
        </p>

        <p className="text-md text-gray-600 leading-relaxed mb-6">
          <strong>Transparency. Accountability. Action.</strong><br />
          That’s the vision behind Janta ko Aawaj — where every voice matters.
        </p>
      </div>
            {/* Complaint Areas */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 mt-16 text-center">
          Sectors Where Complaints Are Addressed
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h4 className="text-lg font-bold text-blue-700 mb-2 text-center">{cat.name}</h4>
              <p className="text-gray-600 text-center text-sm">{cat.description}</p>
            </div>
          ))}
        </div>
         </section>
    )
}