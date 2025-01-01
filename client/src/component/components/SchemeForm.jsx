import React, { useState } from 'react';

const SchemeForm = ({ categories, onAddScheme }) => {
  const [formData, setFormData] = useState({
    schemeName: '',
    shortDescription: '',
    fullDescription: '',
    url: '',
    categories: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      categories: selectedCategories,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate data before submitting
    if (!formData.schemeName || !formData.shortDescription || !formData.fullDescription || !formData.url) {
      alert("All fields are required");
      return;
    }

    // Pass the form data back to App component
    onAddScheme(formData);

    // Reset form fields
    setFormData({
      schemeName: '',
      shortDescription: '',
      fullDescription: '',
      url: '',
      categories: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Scheme</h2>
      <input
        type="text"
        name="schemeName"
        value={formData.schemeName}
        onChange={handleInputChange}
        placeholder="Scheme Name"
        required
      />
      <input
        type="text"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleInputChange}
        placeholder="Short Description"
        required
      />
      <textarea
        name="fullDescription"
        value={formData.fullDescription}
        onChange={handleInputChange}
        placeholder="Full Description"
        required
      />
      <input
        type="url"
        name="url"
        value={formData.url}
        onChange={handleInputChange}
        placeholder="URL"
        required
      />
      <select
        name="categories"
        multiple
        value={formData.categories}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <button type="submit">Add Scheme</button>
    </form>
  );
};

export default SchemeForm;
