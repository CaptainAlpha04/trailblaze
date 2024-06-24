'use client'
import React from 'react'
import { MouseEvent, KeyboardEvent, ChangeEvent } from 'react'
import {useState} from 'react'
import {useRouter} from 'next/navigation'

const commonSubjects = ['Math', 'Science', 'History', 'English', 'Art'];

function personalized() {
  const [selectedDegree, setSelectedDegree] = React.useState<string>('Bachelor');
  const [majorSubject, setMajorSubject] = React.useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjectValue, setSubjectValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [fieldValue, setFieldValue] = useState<string>('');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [hobbyValue, setHobbyValue] = useState<string>('');
  const [experience, setExperience] = useState<number>(0);

  const router = useRouter();

  const handleChipClick = (subject: string) => {
    if (!selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleInputChange = (event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setSubjectValue(value);

    const filteredSuggestions = commonSubjects.filter(subject =>
      subject.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && subjectValue) {
      if (!selectedSubjects.includes(subjectValue)) {
        setSelectedSubjects([...selectedSubjects, subjectValue]);
      }
      setSubjectValue('');
      setSuggestions([]);
    }
  };

  const handleFieldInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && fieldValue) {
      if (!selectedFields.includes(fieldValue)) {
        setSelectedFields([...selectedFields, fieldValue]);
      }
      setFieldValue('');
    }
  };

  const handlehobbyInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && hobbyValue) {
      if (!selectedHobbies.includes(hobbyValue)) {
        setSelectedHobbies([...selectedHobbies, hobbyValue]);
      }
      setHobbyValue('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!selectedSubjects.includes(suggestion)) {
      setSelectedSubjects([...selectedSubjects, suggestion]);
    }
    setSubjectValue('');
    setSuggestions([]);
  };

  const handleChipRemoval = (event: MouseEvent) => {
    const chip = (event.target as HTMLSpanElement).textContent;
    const updatedSubjects = selectedSubjects.filter(subject => subject !== chip);
    setSelectedSubjects(updatedSubjects);
  }

  const handleFieldChipRemoval = (event: MouseEvent) => {
    const chip = (event.target as HTMLSpanElement).textContent;
    const updatedFields = selectedFields.filter(subject => subject !== chip);
    setSelectedFields(updatedFields);
  }

  const handleHobbyChipRemoval = (event: MouseEvent) => {
    const chip = (event.target as HTMLSpanElement).textContent;
    const updatedHobbies = selectedHobbies.filter(subject => subject !== chip);
    setSelectedHobbies(updatedHobbies);
  }

  const handleDegreeChange = (event: MouseEvent, degree:string) => {
    setSelectedDegree(degree);
  };

  const handleMajorSubject = (event: KeyboardEvent) => {
    setMajorSubject((event.target as HTMLInputElement).value);
    console.log(majorSubject)
  }

  async function submitForm(event: MouseEvent) {
    event?.preventDefault();
    const data = {
    degree: selectedDegree,
    major: majorSubject,
    favouriteHighSchoolSubjects: selectedSubjects,
    fieldsInterestedIn: selectedFields,
    hobbies: selectedHobbies,
    additionalExperience: experience
    }

    const response = await fetch('http://localhost:3000/api/fetchCareer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    const responseData = await response.json();
    console.log('before if')
    if (responseData.message) {
      console.log('hello world')
      // Store the data in local storage or context for access on the career details page
      localStorage.setItem('careerData', JSON.stringify(responseData.message));
      // Redirect to the career details page
      router.push(`/result/${majorSubject}`);
    } else {
      console.error('Failed to fetch career data:', responseData.error);
    }
    
  }

  return (
    <>
    <form className="min-h-screen min-w-screen py-20 px-5 flex gap-5 flex-wrap">
    
      {/* Educational Info Card */}
      <div className="card w-fit bg-base-200 shadow-xl font-mono">
        <div className="card-body">
          <h1 className="card-title text-2xl">Educational Information</h1>
          
          {/* Degree Level Area */}
          <div className="justify-start my-2">
            <h2 className="text-md">Choose degree level</h2>
            <div className='flex mt-2 gap-2 flex-wrap'>
              {['High School', 'Bachelor', 'Masters', 'PhD'].map((degree) => (
                <div
                  key={degree}
                  className={`btn rounded-full ${selectedDegree === degree ? 'btn-success' : 'btn-outline'}`}
                  onClick={(event) => handleDegreeChange(event, degree)}
                >
                  <label>{degree}</label>
                </div>
              ))}
            </div>
          </div>

            <div className="justify-start my-2 w-96">
              <h2>Enter your Major</h2>
              <input type="text" className="input mt-2 input-outline input-bordered w-full focus:input-secondary" placeholder="Major Subject..." onKeyDown = {(event) => {handleMajorSubject(event)}} required/>
          </div>

           {/* Favourite Subject */}
      <div className="justify-start my-2 w-96 flex flex-wrap">
      <h2>Choose Favourite Subject(s)</h2>
      <div className="mt-2">
        <div className="flex flex-wrap gap-2">
          {commonSubjects.map((subject, index) => (
            <span
              key={index}
              className={`chip badge badge-outline cursor-pointer my-1 ${selectedSubjects.includes(subject) ? 'badge-secondary' : ''}`}
              onClick={() => handleChipClick(subject)}
            >
              {subject}
            </span>
          ))}
        </div>
        <input
          type="text"
          className="input mt-2 input-outline input-bordered w-96 focus:input-secondary"
          placeholder="Favourite Subjects..."
          value={subjectValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        {suggestions.length > 0 && (
          <div className="bg-base-300 border-base-300 mt-1 rounded-lg w-96">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-base-100 rounded-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        <div className="mt-2">
          {selectedSubjects.map((subject, index) => (
            <span key={index} className="chip badge badge-primary m-1 hover:cursor-pointer" onClick={handleChipRemoval}>
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Fields Interested In */}
    <div className="justify-start my-2 w-96 flex flex-wrap">
      <h2>Interested Field(s)</h2>
      <div className="mt-2">
        <input
          type="text"
          className="input mt-2 input-outline input-bordered w-96 focus:input-secondary"
          placeholder="Interested Fields..."
          value={fieldValue}
          onChange={(event) => setFieldValue(event.target.value)}
          onKeyDown={handleFieldInputKeyDown}
          
          />

        <div className="mt-2">
          {selectedFields.map((Field, index) => (
            <span key={index} className="chip badge badge-accent m-1 hover:cursor-pointer" onClick={handleFieldChipRemoval}>
              {Field}
            </span>
          ))}
        </div>
      </div>
    </div>


    </div>
    </div>

    {/* Additional Information Card */}      
    <div className="card w-fit bg-base-200 shadow-xl font-mono h-fit">
      <div className='card-body'>
        <h1 className="card-title text-2xl">Additional Information</h1>


        {/* Fields Interested In */}
          <div className="justify-start my-2 w-96 flex flex-wrap">
            <h2>Hobbies</h2>
            <div className="mt-2">
              <input
                type="text"
                className="input mt-2 input-outline input-bordered w-96 focus:input-secondary"
                placeholder="Hobbies..."
                value={hobbyValue}
                onChange={(event) => setHobbyValue(event.target.value)}
                onKeyDown={handlehobbyInputKeyDown}
                
                />

              <div className="mt-2">
                {selectedHobbies.map((Hobby, index) => (
                  <span key={index} className="chip badge badge-secondary m-1 hover:cursor-pointer" onClick={handleHobbyChipRemoval}>
                    {Hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className='justify-start my-2 w-96 flex flex-wrap'>
            <h2>Experience in given Field (years)</h2>
            <div className='flex gap-2 align-middle w-96 justify-between'>
              <input type="range" min={0} max={50} value={experience} className="range my-5" required onChange={(event) => setExperience(parseInt(event.target.value))}/>
              <input type="number" value={experience} className="input mt-2 input-outline input-bordered w-11 focus:input-secondary no-spinner" onChange={(event) => setExperience(parseInt(event.target.value))}/>
            </div>
              
          </div>
        
    <button type="submit" className='btn btn-primary' onClick={submitForm}>
      Submit
    </button>

      </div>
    </div>
  </form>
    </>
  )
}

export default personalized
