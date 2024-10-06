
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      {/* <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CryptoFinance</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-200">Home</a></li>
              <li><a href="#" className="hover:text-blue-200">Solutions</a></li>
              <li><a href="#" className="hover:text-blue-200">About</a></li>
              <li><a href="#" className="hover:text-blue-200">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header> */}

      {/* Main Banner */}
      <section className="btn-primary text-white h-[70vh] flex items-center">
        <div className="container mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6">Revolutionary Crypto Finance Solutions</h2>
          <p className="text-2xl mb-20">Empower your business with our cutting-edge crypto payroll and token management platform</p>
          <a href="#" className="mt-10 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-2xl hover:bg-blue-100 transition duration-300">Get Started</a>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-tertiary">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Comprehensive Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Crypto Payroll</h4>
              <p>Streamline your payroll process with our secure and efficient crypto payment system.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Token Creation</h4>
              <p>Launch your own cryptocurrency with our user-friendly token creation platform.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Token Minting</h4>
              <p>Easily mint new tokens to grow your cryptocurrency ecosystem.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Token Vesting & Staking</h4>
              <p>Implement vesting schedules and staking rewards to incentivize long-term holding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="btn-primary text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Finance Operations?</h3>
          <p className="text-xl mb-8">Join the crypto revolution and take your business to the next level</p>
          <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition duration-300">Contact Us Today</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>© 2023 CryptoFinance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
