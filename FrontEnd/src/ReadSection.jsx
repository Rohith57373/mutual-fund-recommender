import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RocketIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SlActionUndo } from "react-icons/sl";
import ReactMarkdown from "react-markdown";
import { TitleCard } from "./components/titleCard";
import { Button } from "./components/ui/button";
import data from "./data.json";

export const ReadSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleCardClick = (id) => {
    const article = data.find((item) => item.id === id);
    setSelectedArticle(article);
  };

  const handleSort = () => {
    const filtered = data.filter((item) => {
      const categoryMatch = selectedCategory
        ? item.category === selectedCategory
        : true;
      const riskMatch = selectedRisk ? item.risk === selectedRisk : true;
      const periodMatch = selectedPeriod
        ? item.period === selectedPeriod
        : true;

      return categoryMatch && riskMatch && periodMatch;
    });

    setFilteredData(filtered);
    setSelectedArticle(null); // Reset selected article when sorting/filtering
  };

  return (
    <div className="flex items-start justify-start ml-[5rem] py-8 px-8 max-w-[90vw]">
      <div className="w-[30vw] pr-4">
        <h1 className="text-4xl font-bold">MoneyMind</h1>
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4">
            <Select
              className="col-span-1"
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Strategies">Strategies</SelectItem>
                <SelectItem value="Plans">Plans</SelectItem>
                <SelectItem value="Guides">Guides</SelectItem>
              </SelectContent>
            </Select>
            <Select
              className="col-span-1"
              onValueChange={(value) => setSelectedRisk(value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            <Select
              className="col-span-1"
              onValueChange={(value) => setSelectedPeriod(value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Short-term">Short Term</SelectItem>
                <SelectItem value="Long-term">Long Term</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="col-span-1"
              variant="default"
              onClick={handleSort}
            >
              Sort
            </Button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[70vh] mt-8 flex flex-col gap-4">
          {filteredData.map((item) => (
            <TitleCard
              Title={item.title}
              key={item.id}
              onClick={() => handleCardClick(item.id)}
            />
          ))}
        </div>
      </div>
      <div className="w-[55vw] border-l border-gray-300 pl-4 ">
        {selectedArticle && (
          <div className="flex flex-col  items-center justify-center ">
            <div className="relative grid grid-cols-1 grid-rows-11 place-items-center h-full ">
              <SlActionUndo
                className="absolute top-10 right-8 h-4 w-4 cursor-pointer"
                onClick={() => setSelectedArticle(null)}
              />
              <h1 className="font-extrabold text-4xl row-span-1 mt-[-1rem]">
                {selectedArticle.title}
              </h1>
              <Alert className="w-[80%] md:w-1/2 row-span-1 mt-[-2rem]">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>You did it!</AlertTitle>
                <AlertDescription>
                  You are 40% ahead of people who don't read.
                </AlertDescription>
              </Alert>
              <ReactMarkdown className="text-lg row-span-8  max-h-[62vh] overflow-y-auto w-full ">
                {selectedArticle.content}
              </ReactMarkdown>
              <div className="justify-end row-span-1 ">
                <Button className="" variant="default" size="lg">
                  Finish Reading
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
