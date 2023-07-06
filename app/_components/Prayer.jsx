"use client";

const Prayer = ({ prayer }) => {
  const { title, adhaanTime, iqaamaTime, imamName } = prayer;
  return (
    <tr className="w-full border-2 text-black hover:bg-purple-950 hover:text-white">
      <td>{title}</td>
      <td>{adhaanTime}</td>
      <td>{iqaamaTime}</td>
      <td>{imamName}</td>
    </tr>
  );
};

export default Prayer;
