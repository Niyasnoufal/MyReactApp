import { useState } from "react"
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


const LoginForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState("")

  // Regex
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    // Validate email
    if (!emailRegex.test(formData.email)) {
      setEmailError("Invalid Email");
      valid = false;
    } else setEmailError("");

    // Validate password
    if (!passwordRegex.test(formData.password)) {
      setPassError("Password must be 8+ chars, with uppercase, lowercase, number, special char");
      valid = false;
    } else setPassError("");

    // Validate phone only if registering
    if (type === "register" && !phoneRegex.test(formData.phone)) {
      setPhoneError("Enter a valid mobile number");
      valid = false;
    } else setPhoneError("");

    // Stop here if invalid
    if (!valid) return;

    try {
      if (type === "register") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        // Save extra details
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          role: "user"
        });
        alert("Register successfull")
        console.log("Registered successfully", user);
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
          formData.role
        );
         
        alert("login successfull")
          
        
       
        console.log("Login successful", userCredential.user);
      }
    } catch (error) {
      console.log("Firebase error:", error.code, error.message);
      setError(error.message)
    } finally {
       // Reset form only after success
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: ""
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {type === "register" && (
        <>
        {error && <p className="text-red-600 text-sm">{error}</p>}
          <input
            type="text"
            placeholder="Enter your Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter your Mobile No"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
        </>
      )}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

      <input
        type="password"
        placeholder="Enter your password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {passError && <p className="text-red-500 text-sm">{passError}</p>}

      <button type="submit" className="bg-amber-600 text-black">
        {type === "login" ? "Login" : "Register"}
      </button>

      {type === "login" ? (
        <Link to="/register" className="text-blue-600 underline">Go to register</Link>
      ) : (
        <Link to="/login" className="text-blue-600 underline">Go to login</Link>
      )}
    </form>
  );
};

export default LoginForm;
