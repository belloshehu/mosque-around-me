import React from "react";
import H3Title from "../../_components/H3Title";
import MosqueAdminForm from "../../_components/MosqueAdminForm";

const MosqueAdminPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <H3Title text={"Mosque Admin"} />
      <p>Want to apply for mosque admin position? Fill the form below</p>
      <MosqueAdminForm />
    </div>
  );
};

export default MosqueAdminPage;
