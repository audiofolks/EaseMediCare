import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessages("Please fill out all  fields.");
    }
    try {
      setLoading(true);
      setErrorMessages(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessages(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessages(errorMessages);
      setLoading(false);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto ">
        <div className=" py-3 flex self-center whitespace-nowrap text-sm sm:text-lg font-semibold  dark:text-white">
          <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
            EaseMediCare
          </span>
          <TiPlus />
        </div>
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6 onsub"
              onSubmit={handleSubmit}
            >
              <div>
                <Label value="Email" />
                <TextInput
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Password" />
                <TextInput
                  type="password"
                  id="password"
                  placeholder="*************"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="greenToBlue"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
              <div className="flex gap-2 text-sm mt-5">
                <span>Dont have an account? </span>
                <Link to="/sign-in" className="text-blue-500">
                  Sign up
                </Link>
              </div>
              {errorMessages && (
                <Alert className="mt-5" color="failure">
                  {errorMessages}
                </Alert>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
