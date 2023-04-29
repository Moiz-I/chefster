import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ReactMarkdown from "react-markdown";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const [selectedTime, setSelectedTime] = useState("No preference"); // Set default option to "2"

  const handleTimeChange = (event) => {
    console.log(event);
    setSelectedTime(event);
  };

  const [selectedDiet, setSelectedDiet] = useState("No preference"); // Set default option to "2"

  const handleDietChange = (event) => {
    console.log(event);
    setSelectedDiet(event);
  };

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate a recipie based ONLY the given ingredients(do not have to use all of them) the user has available in their cupboard, give me a markdown recipe with: title as name of the dish, a line for preparation time(should be a specific time in ${selectedTime}). then a subheading(h3) for ingredients with bullet point ingredients(with all quantities MUST be BOTH metric AND imperial units), a subheading(h3) for instructions and ordered steps for making the dish including specific times in degrees/Fahrenheit, and timings for each with tips, so it is in the style of a chef's cookbook. diet:${selectedDiet}. base it on these ingredients: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  const [ingredients, setIngredients] = useState<string[]>([]);

  const getIngredients = () => {
    setIngredients([
      "eggs",
      " salt",
      " black pepper",
      " rice",
      " pasta",
      " milk",
      " butter",
      " flour",
      " sugar",
      " olive oil",
      " garlic",
      " onions",
      " potatoes",
      " tomatoes",
      " lettuce",
      " bread",
    ]);
  };

  const diets = [
    "No preference",
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Gluten-free",
    "Ketogenic",
    "Paleo",
  ];
  const times = [
    "No preference",
    "Less than 15 minutes",
    "15-30 minutes",
    "30-60 minutes",
    "> 60 minutes",
  ];

  const getOptions = (
    options: any[],
    selectedOption: any,
    handleOptionChange: (arg0: any) => void
  ) => {
    return options.map((option) => {
      const Option = () => {
        return (
          <>
            <div
              className="flex items-center"
              onClick={() => handleOptionChange(option)}
            >
              <span
                className={
                  "cursor-pointer flex items-center justify-center border text-xs text-lime-800 rounded-full px-2 py-1 shadow-sm font-san " +
                  (selectedOption === option
                    ? "bg-lime-300/50 text-teal-900"
                    : "bg-white")
                }
              >
                {option}
              </span>
            </div>
          </>
        );
      };
      return <Option key={option} />;
    });
  };

  return (
    <div
      className="flex max-w-5xl mx-auto flex-col overflow-auto items-center justify-center min-h-screen px-4"
      id="scroller"
    >
      <Head>
        <title>Chefster</title>
      </Head>

      {/* <Image
        alt="header text"
        src="/chefbot.png"
        className="sm:w-12 sm:h-12 w-8 h-8"
        width={32}
        height={32}
      /> */}
      <h1 className="text-5xl font-serif text-green-800">
        👨‍🍳 Chefster{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5"
          height="5"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 mb-5"
        >
          <path
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z "
            fill="green"
          />
        </svg>
      </h1>

      {/* <Header /> */}

      <a
        className="cursor-pointer fixed left-4 bottom-4 text-xs px-3 py-1 rounded-xl text-slate-500 bg-slate-200 bg-opacity-60 backdrop-filter backdrop-blur-lg hover:bg-green-200 transition"
        href="https:/twitter.com/Moiz_zzz"
      >
        Made with 💚 by Moiz
      </a>

      <main className="">
        {/* <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterbio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a> */}

        {/* <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your next Twitter bio using chatGPT
        </h1> */}

        {/* <p className="text-slate-500 mt-5">47,118 bios generated so far.</p> */}
        <div className="max-w-xl w-full mb-5">
          <div className="flex mt-10 items-center space-x-3">
            {/* <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            /> */}
            <p className="text-left font-medium text-black">
              🥬 Enter some ingredients{" "}
              <span className="text-green-900">
                (and get back a great recipe!)
              </span>
              .
            </p>
          </div>
          <p className="text-sm mt-1 text-slate-400">
            (fridge-scanning companion app coming soon!)
          </p>
          <div className="mb-14">
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients([e.target.value])}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-lime-700 focus:ring-lime-700 mt-5 text-gray-700"
              placeholder={
                "e.g. rice, tomatoes, onions, garlic, salt, pepper, olive oil"
              }
            />
            <div
              className="inline-flex items-center cursor-pointer hover:bg-slate-200 rounded p-1"
              onClick={getIngredients}
            >
              <span className="text-sm font text-gray-600">
                🎲 Give me some common ingredients
              </span>
            </div>
          </div>
          {/* <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div> */}

          <div className="mb-8">
            {" "}
            <label className="mb-3 block text-sm uppercase text-center text-gray-500 font-sans">
              🌿 Diet preferances
            </label>
            <div className="flex mb-10 flex-wrap gap-2">
              {/* <div className="flex items-center" onClick={handleDietChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedDiet === "No preference"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  No preference
                </span>
              </div>
              <div className="flex items-center" onClick={handleDietChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedDiet === "Vegetarian"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  Vegetarian
                </span>
              </div>
              <div className="flex items-center" onClick={handleDietChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedDiet === "15-30 minutes"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  15-30 minutes
                </span>
              </div>
              <div className="flex items-center" onClick={handleDietChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedDiet === "30-60 minutes"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  30-60 minutes
                </span>
              </div>
              <div className="flex items-center" onClick={handleDietChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedDiet === "More than 60 minutes"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  More than 60 minutes
                </span>
              </div> */}
              {getOptions(diets, selectedDiet, handleDietChange)}
            </div>
          </div>

          <div className="mb-8">
            {" "}
            {/* COOKING TIME */}
            <label className="mb-3 block text-sm uppercase text-center text-gray-500 font-sans">
              ⏰ Cooking time
            </label>
            <div className="flex flex-wrap gap-2">
              {/* <div className="flex items-center" onClick={handleOptionChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedOption === "No preference"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  No preference
                </span>
              </div>
              <div className="flex items-center" onClick={handleOptionChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedOption === "Less than 15 minutes"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  Less than 15 minutes
                </span>
              </div>
              <div className="flex items-center" onClick={handleOptionChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedOption === "15-30 minutes"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  15-30 minutes
                </span>
              </div>
              <div className="flex items-center" onClick={handleOptionChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedOption === "30-60 minutes"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  30-60 minutes
                </span>
              </div>
              <div className="flex items-center" onClick={handleOptionChange}>
                <span
                  className={
                    "cursor-pointer flex items-center justify-center border text-xs rounded-full px-2 py-1 shadow-sm font-san " +
                    (selectedOption === "More than 60 minutes"
                      ? "bg-teal-100/50 text-teal-900"
                      : "bg-white")
                  }
                >
                  More than 60 minutes
                </span>
              </div> */}
              {getOptions(times, selectedTime, handleTimeChange)}
            </div>
          </div>

          {!loading && (
            <button
              className="bg-lime-700 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-lime-700/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Create recipe &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-lime-700 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-lime-700/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />

        <div
        // className="space-y-10 my-10"
        >
          {generatedBios && (
            <>
              <div>
                <h2
                  // className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  {/* Your generated bios */}
                </h2>
              </div>
              <div
              // className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto"
              >
                <ReactMarkdown
                  className="prose font-serif max-w-xl w-full mb-5 mt-4"
                  id="anchor"
                >
                  {generatedBios}
                </ReactMarkdown>

                {/* {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })} */}
              </div>
            </>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
