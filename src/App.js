import './App.css';
import React, { useState } from 'react';
import Papa from 'papaparse';

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    if (file) {
      // Read the JSON file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);

          // Convert JSON to CSV using Papaparse
          const csvData = Papa.unparse(jsonData);

          // Create a Blob and download the CSV file
          const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'converted_file.csv';
          link.click();
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };

      reader.readAsText(file);
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div className="file-converter-container">
      <label for="images" class="drop-container" id="dropcontainer">
        <span class="drop-title">Drop files here</span>
        or
        <label htmlFor="images" className="file-icon-button">
          <img src={'/json-icon.png'} height={50} width={50} alt="File Icon" />
          {
            file ? file.name : 'No File Chosen'
          }
        </label>
        <input type="file" id="images" accept=".json" onChange={handleFileChange} required />
      </label>
      <button onClick={handleFileUpload} disabled={!file} style={{ backgroundColor: file ? '#4caf50' : 'grey', cursor: file ? 'pointer' : 'default'} }>Convert and Download CSV</button>
    </div>
  );
};

export default App;
