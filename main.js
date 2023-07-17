// Conversion functions for Length
const kmToMilesEl = (km) => km * 0.621371;
const milesToKmEl = (miles) => miles / 0.621371;

// Conversion functions for Fuel Economy
const kmlTompgEl = (kml) => kml * 2.352145;
const mpgTokmlEl = (mpg) => mpg * 0.425144;

// Conversion functions for Digital Storage
const byTokbEl = (byte) => byte * 0.001;
const kbTobyEl = (kb) => kb * 1000;

const conversions = {
  length: {
    Kilometers: kmToMilesEl,
    Miles: milesToKmEl,
  },
  fuel: {
    "km/l": kmlTompgEl,
    MPG: mpgTokmlEl,
  },
  digi: {
    Kilobytes: kbTobyEl,
    Bytes: byTokbEl,
  },
};

function convert() {
  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("from-unit").value;
  const toUnit = document.getElementById("to-unit").value;
  const value = Number(document.getElementById("from-value").value).toFixed(3);

  let result;

  if (category in conversions && fromUnit === toUnit) {
    result = value;
  } else {
    const conversionFunction = conversions[category][fromUnit];
    result = conversionFunction(value);
  }

  document.getElementById("to-value").value = result.toFixed(3);
}

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    convert();
  }
});

document.getElementById("category").addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  updateConversionUnits(selectedCategory);
});

function updateConversionUnits(category) {
  const fromUnitSelect = document.getElementById("from-unit");
  const toUnitSelect = document.getElementById("to-unit");

  if (category === "start") {
    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";
    document.getElementById("from-value").value = "";
    document.getElementById("to-value").value = "";
    return;
  }

  const units = Object.keys(conversions[category]);

  fromUnitSelect.innerHTML = "";
  toUnitSelect.innerHTML = "";

  units.forEach((unit) => {
    fromUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    toUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
  });

  document.getElementById("from-value").value = "";
  document.getElementById("to-value").value = "";

  // Set default unit selections
  fromUnitSelect.value = units[0];
  toUnitSelect.value = units[1];
}

