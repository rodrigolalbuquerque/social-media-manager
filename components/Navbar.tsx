import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center justify-between bg-gray-800">
      <Link href="/" className="my-5 ml-5 text-2xl font-medium text-slate-50">
        HomePage
      </Link>
      <div className="mx-5 my-5 flex gap-5">
        <div className="date-container">
          <select id="year">
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="date-container">
          <select id="month">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
          </select>
        </div>
      </div>
      <Link
        href="/hashtags"
        className="my-5 mr-5 text-2xl font-medium text-slate-50"
      >
        Hashtags
      </Link>
    </div>
  );
}

export default Navbar;
