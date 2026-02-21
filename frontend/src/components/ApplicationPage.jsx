import React, { useState, useRef } from 'react';
import '../styles/ApplicationPage.css';
import { Link } from "react-router-dom";

const ApplicationPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef(null);

  // Demo images data
  const demoImages = [
    {
      id: 1,
      name: 'Normal Retina',
      description: 'Healthy retinal fundus image',
      category: 'Normal'
    },
    {
      id: 2,
      name: 'Diabetic Retinopathy',
      description: 'Early stage diabetic retinopathy',
      category: 'Disease'
    },
    {
      id: 3,
      name: 'Glaucoma',
      description: 'Glaucoma affected retina',
      category: 'Disease'
    },
    {
      id: 4,
      name: 'Macular Degeneration',
      description: 'Age-related macular degeneration',
      category: 'Disease'
    }
  ];

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(file);
          setImagePreview(reader.result);
          setResults(null);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image file');
      }
    }
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(file);
        setImagePreview(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Process image (simulate API call)
  const processImage = async () => {
    if (!uploadedImage) {
      alert('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock results - replace with actual API call
      const mockResults = {
        diabeticRetinopathy: {
          detected: true,
          severity: 'Moderate',
          confidence: 87.5,
          description: 'Signs of diabetic retinopathy detected with moderate severity'
        },
        glaucoma: {
          detected: false,
          severity: 'None',
          confidence: 12.3,
          description: 'No signs of glaucoma detected'
        },
        macularDegeneration: {
          detected: false,
          severity: 'None',
          confidence: 8.7,
          description: 'No signs of macular degeneration detected'
        },
        overallRisk: 'Medium',
        recommendations: [
          'Regular follow-up recommended within 3 months',
          'Maintain good blood sugar control',
          'Consult with an ophthalmologist for detailed examination'
        ]
      };
      
      setResults(mockResults);
      setIsProcessing(false);
    }, 3000);
  };

  // Use demo image
  const useDemoImage = (demoId) => {
    setActiveTab('upload');
    // Simulate loading a demo image
    const demoImage = demoImages.find(img => img.id === demoId);
    if (demoImage) {
      // In a real application, you would load the actual demo image
      setImagePreview(null);
      setUploadedImage({ name: demoImage.name });
      setResults(null);
      alert(`Demo image "${demoImage.name}" selected. In production, this would load the actual image.`);
    }
  };

  // Reset everything
  const resetAnalysis = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="application-page">

       <div className="chatbot-nav">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/chatbot" className="nav-btn">Chatbot</Link>
      </div>

      <header className="app-header">
        <h1>Retina - Ocular Disease Screening System</h1>
        <p>Comprehensive Retinal Fundus Image Analysis for Diabetic Patients</p>
      </header>

      <div className="main-container">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Image
          </button>
          <button
            className={`tab-button ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            Demo Section
          </button>
        </div>

        {/* Upload Section */}
        {activeTab === 'upload' && (
          <div className="upload-section">
            <div className="upload-container">
              {!imagePreview ? (
                <div
                  className="upload-area"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <h3>Drag & Drop Your Retinal Fundus Image</h3>
                  <p>or click to browse</p>
                  <p className="file-info">Supports: JPG, PNG, JPEG (Max 10MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div className="image-preview-container">
                  <div className="preview-header">
                    <h3>Uploaded Image</h3>
                    <button className="remove-button" onClick={resetAnalysis}>
                      Remove
                    </button>
                  </div>
                  <div className="image-preview">
                    <img src={imagePreview} alt="Uploaded retinal fundus" />
                  </div>
                  {/* <div className="image-info">
                    <p><strong>File:</strong> {uploadedImage.name}</p>
                    <p><strong>Type:</strong> {uploadedImage.type}</p>
                    <p><strong>Size:</strong> {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div> */}
                  <button
                    className="process-button"
                    onClick={processImage}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Analyze Image'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Demo Section */}
        {activeTab === 'demo' && (
          <div className="demo-section">
            <div className="demo-header">
              <h2>Try Our Demo Images</h2>
              <p>Select a sample retinal fundus image to see how the system works</p>
            </div>
            <div className="demo-grid">
              {demoImages.map((demo) => (
                <div key={demo.id} className="demo-card">
                  <div className="demo-image-placeholder">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <h3>{demo.name}</h3>
                  <p>{demo.description}</p>
                  <span className={`demo-badge ${demo.category.toLowerCase()}`}>
                    {demo.category}
                  </span>
                  <button
                    className="use-demo-button"
                    onClick={() => useDemoImage(demo.id)}
                  >
                    Use This Image
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Output Section */}
        {results && (
          <div className="output-section">
            <h2>Analysis Results</h2>
            <div className="results-container">
              {/* Overall Risk Assessment */}
              <div className="risk-card">
                <h3>Overall Risk Assessment</h3>
                <div className={`risk-indicator ${results.overallRisk.toLowerCase()}`}>
                  <span className="risk-level">{results.overallRisk} Risk</span>
                </div>
              </div>

              {/* Disease Detection Results */}
              <div className="disease-results">
                <h3>Disease Detection</h3>
                <div className="disease-grid">
                  {/* Diabetic Retinopathy */}
                  <div className="disease-car">
                    <div className="disease-header">
                      <h4>Diabetic Retinopathy</h4>
                      <span className={`detection-badge ${results.diabeticRetinopathy.detected ? 'detected' : 'not-detected'}`}>
                        {results.diabeticRetinopathy.detected ? 'Detected' : 'Not Detected'}
                      </span>
                    </div>
                    <div className="disease-details">
                      <p><strong>Severity:</strong> {results.diabeticRetinopathy.severity}</p>
                      <p><strong>Confidence:</strong> {results.diabeticRetinopathy.confidence}%</p>
                      <p className="disease-description">{results.diabeticRetinopathy.description}</p>
                    </div>
                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{ width: `${results.diabeticRetinopathy.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Glaucoma */}
                  <div className="disease-car">
                    <div className="disease-header">
                      <h4>Glaucoma</h4>
                      <span className={`detection-badge ${results.glaucoma.detected ? 'detected' : 'not-detected'}`}>
                        {results.glaucoma.detected ? 'Detected' : 'Not Detected'}
                      </span>
                    </div>
                    <div className="disease-details">
                      <p><strong>Severity:</strong> {results.glaucoma.severity}</p>
                      <p><strong>Confidence:</strong> {results.glaucoma.confidence}%</p>
                      <p className="disease-description">{results.glaucoma.description}</p>
                    </div>
                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{ width: `${results.glaucoma.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Macular Degeneration */}
                  <div className="disease-car">
                    <div className="disease-header">
                      <h4>Macular Degeneration</h4>
                      <span className={`detection-badge ${results.macularDegeneration.detected ? 'detected' : 'not-detected'}`}>
                        {results.macularDegeneration.detected ? 'Detected' : 'Not Detected'}
                      </span>
                    </div>
                    <div className="disease-details">
                      <p><strong>Severity:</strong> {results.macularDegeneration.severity}</p>
                      <p><strong>Confidence:</strong> {results.macularDegeneration.confidence}%</p>
                      <p className="disease-description">{results.macularDegeneration.description}</p>
                    </div>
                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{ width: `${results.macularDegeneration.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="recommendations-card">
                <h3>Recommendations</h3>
                <ul className="recommendations-list">
                  {results.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="download-button" onClick={() => alert('Download feature would be implemented here')}>
                  Download Report
                </button>
                <button className="new-analysis-button" onClick={resetAnalysis}>
                  New Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="processing-overlay">
            <div className="processing-spinner">
              <div className="spinner"></div>
              <p>Analyzing retinal fundus image...</p>
              <p className="processing-subtext">This may take a few moments</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;

