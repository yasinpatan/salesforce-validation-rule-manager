import "./App.css";
import { useEffect, useState } from "react";

function App() {

  const [token, setToken] = useState("");
  const [rules, setRules] = useState([]);

  useEffect(() => {

    const hash = window.location.hash;

    if (hash) {

      const accessToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      setToken(accessToken);

      localStorage.setItem("access_token", accessToken);
    }

  }, []);

  const loginToSalesforce = () => {

    const clientId = "3MVG9VMBZCsTL9hkkoQDify0Pn_mk6NkgmNOUf8iXCg0t0G9hJjd3aGJo16mJJTipJ4fUoKrE5aV734ZCRx5c";

    const redirectUri = "http://localhost:3001";

    const authUrl =
      `https://orgfarm-412815bab7-dev-ed.develop.my.salesforce.com/services/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = authUrl;
  };

  const getValidationRules = async () => {

    const sampleRules = [

      {
        Id: 1,
        DeveloperName: "Website_Required",
        ErrorDisplayField: "Website"
      },

      {
        Id: 2,
        DeveloperName: "Email_Validation",
        ErrorDisplayField: "Email"
      }

    ];

    setRules(sampleRules);
  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Salesforce Validation Rule Manager</h1>

      {
        token ? (

          <div>

            <h2>Login Successful ✅</h2>

            <button onClick={getValidationRules}>
              Get Validation Rules
            </button>

            <div style={{ marginTop: "20px" }}>

              {
                rules.map((rule) => (

                  <div
                    key={rule.Id}
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      marginBottom: "10px"
                    }}
                  >

                    <h3>{rule.DeveloperName}</h3>

                    <p>
                      Error Field: {rule.ErrorDisplayField}
                    </p>

                  </div>

                ))
              }

            </div>

          </div>

        ) : (

          <button onClick={loginToSalesforce}>
            Login to Salesforce
          </button>

        )
      }

    </div>

  );
}

export default App;