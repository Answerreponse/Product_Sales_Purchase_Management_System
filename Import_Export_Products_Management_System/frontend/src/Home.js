/*import React from "react";

function Home(){
    return (
        <div>
            <div>
                <h2>Welome to the home page</h2>
            </div>
        </div>
    );
}
export default Home; */



import React from "react";

function Home(){

    return(
        <div className="min-h-screen flex flex-col">

            {/* Body Section */}
            <div className="flex-1 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 flex items-center justify-center">

                <div className="text-center text-white px-6">

                    <h1 className="text-5xl font-bold mb-6">
                        Stock Management System
                    </h1>

                    <p className="text-xl mb-4">
                        Manage Imported and Exported Products Easily
                    </p>

                    <p className="text-lg text-gray-200">
                        Track stock quantity, monitor sales, and generate reports
                        efficiently in one system.
                    </p>

                    <button className="mt-8 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                        Get Started
                    </button>

                </div>

            </div>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-4">

                <div className="container mx-auto text-center">

                    <p className="text-sm">
                        © 2026 Stock Management System. All Rights Reserved.
                    </p>

                    
                </div>

            </footer>

        </div>
    );

}

export default Home;
