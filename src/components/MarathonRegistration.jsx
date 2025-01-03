import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../authentication/AuthProvider";

export default function MarathonRegistration() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [marathon, setMarathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        additionalInfo: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch marathon details by ID
        axios
            .get(`http://localhost:5000/users/${id}`)
            .then((response) => {
                setMarathon(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching marathon details:", error);
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const registrationData = {
            title: title,
            marathonStartDate: marathonStartDate,
            registerEmail: user?.email,
            marathonId: id,
            ...formData,
        };

        //console.log(registrationData);


        axios
            .post("http://localhost:5000/registrations", registrationData)
            .then((response) => {
                alert("Registration successful!");

                // Update the marathon's count
                return axios.put(`http://localhost:5000/users/${id}`, { count: marathon.count + 1 });
            })
            .then((response) => {
                if (response.data.modifiedCount > 0 || response.data.upsertedCount > 0) {
                    setMarathon((prev) => ({ ...prev, count: prev.count + 1 })); // Update the state
                    alert("Marathon count updated successfully!");
                } else {
                    alert("Count update failed. Please refresh and try again.");
                }
            })
            .catch((error) => {
                console.error("Error during registration or updating count:", error);
                alert("Something went wrong. Please try again.");
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin mb-4"></div>
                    <p className="text-lg font-semibold text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!marathon) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-gray-600">Marathon not found.</p>
            </div>
        );
    }

    const { title, marathonStartDate, count } = marathon;

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Register for {title}</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Marathon Title</label>
                    <input
                        type="text"
                        value={title}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Start Date</label>
                    <input
                        type="text"
                        value={new Date(marathonStartDate).toLocaleDateString()}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Contact Number</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Additional Info</label>
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
