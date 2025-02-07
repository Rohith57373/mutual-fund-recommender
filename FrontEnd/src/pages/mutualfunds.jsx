import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Example mutual funds data (replace with your actual data source)
import data from "./csvtojson.json";

const MutualFunds = () => {
  const [filters, setFilters] = useState({
    scheme_type: [],
    scheme_category: [],
    risk_level: [],
    age_group: [],
    investment_duration: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    scheme_type: [],
    scheme_category: [],
    risk_level: [],
    age_group: [],
    investment_duration: [],
  });

  const [filteredFunds, setFilteredFunds] = useState([]);

  useEffect(() => {
    const extractUniqueOptions = (key) =>
      Array.from(new Set(data.map((item) => item[key])));

    setFilters({
      scheme_type: extractUniqueOptions("Scheme Type"),
      scheme_category: extractUniqueOptions("Scheme Category"),
      risk_level: extractUniqueOptions("Risk Level"),
      age_group: extractUniqueOptions("Age Group"),
      investment_duration: extractUniqueOptions("Investment Duration"),
    });
  }, []);

  useEffect(() => {
    filterFunds();
  }, [selectedFilters]);

  const filterFunds = () => {
    let filtered = data;
    let filtered1 = [];

    if (selectedFilters.scheme_type.length > 0) {
      filtered1 = filtered.filter((fund) =>
        selectedFilters.scheme_type.includes(fund["Scheme Type"])
      );
    }
    if (selectedFilters.scheme_category.length > 0) {
      filtered1 = filtered.filter((fund) =>
        selectedFilters.scheme_category.includes(fund["Scheme Category"])
      );
    }
    if (selectedFilters.risk_level.length > 0) {
      filtered1 = filtered.filter((fund) =>
        selectedFilters.risk_level.includes(fund["Risk Level"])
      );
    }
    if (selectedFilters.age_group.length > 0) {
      filtered1 = filtered.filter((fund) =>
        selectedFilters.age_group.includes(fund["Age Group"])
      );
    }
    if (selectedFilters.investment_duration.length > 0) {
      filtered1 = filtered.filter((fund) =>
        selectedFilters.investment_duration.includes(
          fund["Investment Duration"]
        )
      );
    }

    setFilteredFunds(filtered1);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      scheme_type: [],
      scheme_category: [],
      risk_level: [],
      age_group: [],
      investment_duration: [],
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="container mx-auto p-2 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4 ml-2">Advanced Search</h1>
      <div className="text-sm grid grid-cols-5 pl-3 gap-6">
        {Object.keys(filters).map((key, index) => (
          <FilterDropdown
            key={index}
            name={capitalizeFirstLetter(key.replace(/_/g, " "))}
            options={filters[key]}
            selected={selectedFilters[key]}
            onChange={(values) =>
              setSelectedFilters({
                ...selectedFilters,
                [key]: values,
              })
            }
          />
        ))}
      </div>
      <hr style={{ margin: "20px auto", width: "calc(100% - 30px)" }} />
      <div className="selected-filters mb-4 ml-2">
        <h3 className="text-xl font-semibold">Active filters:</h3>
        <div id="active-filters" className="flex flex-wrap">
          {Object.keys(selectedFilters).map((key) =>
            selectedFilters[key].map((value, index) => (
              <div
                key={index}
                className="bg-gray-700 text-white px-2 py-1 rounded-full m-1 text-sm"
              >
                {value}
              </div>
            ))
          )}
        </div>
        <button
          type="button"
          className="mt-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700"
          onClick={clearAllFilters}
        >
          Clear all
        </button>
      </div>
      <hr style={{ margin: "20px auto", width: "calc(100% - 30px)" }} />
      <div className="results">
        <h2 className="text-xl font-semibold mb-4">Recommended Mutual Funds</h2>
        <FundList funds={filteredFunds} />
      </div>
    </div>
  );
};

const FilterDropdown = ({ name, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timer;

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setIsOpen(false);
    }, 150); // adjust the delay as necessary
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      onChange([...selected, value]);
    } else {
      onChange(selected.filter((item) => item !== value));
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="w-full text-left bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        {name}
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-white shadow-md rounded-lg mt-1 w-full">
          {options.map((option, index) => (
            <label
              key={index}
              className="block px-4 py-2 text-sm" // added text-sm for smaller font
            >
              <input
                type="checkbox"
                value={option}
                checked={selected.includes(option)}
                onChange={handleChange}
                className="mr-2"
              />
              {capitalizeFirstLetter(option)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

FilterDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

const FundList = ({ funds }) => (
  <div className="text-sm grid grid-cols-3 gap-4">
    {funds.map((fund, index) => {
      const fundName = fund.AMC; // Replace with your data field
      const fundDetails = `${fund["Scheme Category"]} - ${fund["Risk Level"]}`; // Example details
      return (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="font-bold">{fundName}</span> - {fundDetails}
        </div>
      );
    })}
  </div>
);

FundList.propTypes = {
  funds: PropTypes.array.isRequired,
};

export default MutualFunds;
