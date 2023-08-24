import Link from "next/link"

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-orange-500">
        <Link href='/' className="ml-5">
            HomePage
        </Link>
        <div className="flex gap-5 my-3 mx-5">
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
        <Link href='/hashtags' className="mr-5">
            Hashtags
        </Link>
    </div>
  )
}

export default Navbar