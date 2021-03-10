import "bootstrap/dist/css/bootstrap.css";

import CurrentWeather from "./CurrentWeather";
import Footer from "./Footer";
import Form from "./Form";

export default function App() {
  return (
    <div className="App">
      <CurrentWeather defaultCity="Taipei" />
      <Footer />
      <Form />
    </div>
  );
}

