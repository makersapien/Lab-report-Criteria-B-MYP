import React, { useState, useEffect } from 'react';
import { Award, Check, ChevronDown, ChevronUp, Star, Compass, Thermometer, Zap, Beaker, ArrowLeft, ArrowRight } from 'lucide-react';

const App = () => {
  // State for tracking which strand is active
  const [activeStrand, setActiveStrand] = useState(1);
  // State for tracking which experiment is chosen
  const [chosenExperiment, setChosenExperiment] = useState(null);
  // State for tracking badges earned
  const [badges, setBadges] = useState({
    strand1: false,
    strand2: false,
    strand3: false,
    strand4: false
  });
  // State for tracking user inputs for their experiment
  const [userInput, setUserInput] = useState({
    research: '',
    hypothesis: '',
    variables: '',
    methodology: ''
  });
  // State for showing completion modal
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  // State for tracking which tab is active (guided vs own)
  const [activeTab, setActiveTab] = useState('guided');
  // State for tracking level in each strand
  const [strandLevel, setStrandLevel] = useState({
    research: 0,
    hypothesis: 0,
    variables: 0,
    methodology: 0
  });
  // State for tracking expanded levels
  const [expandedLevels, setExpandedLevels] = useState({});
  
  // Function to toggle level expansion
  const toggleLevel = (strand, level) => {
    const key = `${strand}-${level}`;
    setExpandedLevels(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Function to handle user input changes
  const handleInputChange = (strand, value) => {
    setUserInput(prev => ({
      ...prev,
      [strand]: value
    }));
  };
  
  // Function to handle strand completion and award badge
  const completeStrand = (strand) => {
    setBadges(prev => ({
      ...prev,
      [strand]: true
    }));
    
    // Check if all strands are complete
    const allComplete = Object.values({
      ...badges,
      [strand]: true
    }).every(value => value);
    
    if (allComplete) {
      setShowCompletionModal(true);
    }
  };
  
  // Function to grade the student's work
  const gradeStrand = (strand) => {
    const text = userInput[strand].toLowerCase();
    let level = 0;
    
    // Basic logic for grading each strand
    if (strand === 'research') {
      if (text.includes('independent variable') && text.includes('dependent variable')) level = 3;
      if (level >= 3 && text.includes('method') && text.includes('measure')) level = 4;
      if (level >= 4 && text.includes('control variable') && text.includes('range')) level = 6;
      if (level >= 6 && text.includes('unit') && text.length > 100) level = 8;
    } else if (strand === 'hypothesis') {
      if (text.includes('if') && text.includes('then')) level = 3;
      if (level >= 3 && text.includes('because')) level = 4;
      if (level >= 4 && text.includes('measured') && text.includes('range')) level = 6;
      if (level >= 6 && text.includes('scientific') && text.includes('reason') && text.length > 100) level = 8;
    } else if (strand === 'variables') {
      if (text.includes('independent') && text.includes('dependent')) level = 3;
      if (level >= 3 && text.includes('control') && text.includes('measure')) level = 4;
      if (level >= 4 && text.includes('manipulate') && text.includes('range')) level = 6;
      if (level >= 6 && text.includes('method') && text.length > 120) level = 8;
    } else if (strand === 'methodology') {
      if (text.includes('materials') && text.includes('steps')) level = 3;
      if (level >= 3 && text.includes('safety') && text.includes('equipment')) level = 4;
      if (level >= 4 && text.includes('logical') && text.includes('repeat')) level = 6;
      if (level >= 6 && text.includes('detailed') && text.length > 150) level = 8;
    }
    
    setStrandLevel(prev => ({
      ...prev,
      [strand]: level
    }));
    
    return level;
  };
  
  // Sample experiments for students to choose from
  const experiments = [
    {
      id: 1,
      title: "Effect of Adding More Magnets on Magnetic Strength",
      description: "Investigate how combining multiple magnets affects the overall magnetic strength",
      icon: <Zap size={24} />
    },
    {
      id: 2,
      title: "Magnetic Field Interaction Distance",
      description: "Investigate how distance affects the strength of magnetic field interactions",
      icon: <Compass size={24} />
    }
  ];

  // Strand content
  const strandContent = {
    1: {
      title: "Research Question",
      icon: <Compass className="text-blue-500" size={28} />,
      description: "A good research question clearly identifies the independent and dependent variables, how they will be measured, and what relationship you're investigating.",
      levels: {
        3: {
          title: "Level 3 Research Question",
          content: "How does temperature affect the strength of a magnet?",
          explanation: "This is a basic research question that mentions both variables but lacks specifics on measurement and range."
        },
        4: {
          title: "Level 4 Research Question",
          content: "How does the temperature of a magnet affect its magnetic strength?",
          explanation: "This question is more specific about the variables but still lacks details on measurement methods and ranges."
        },
        6: {
          title: "Level 6 Research Question",
          content: "How does the temperature of a magnet in the range of 10°C to 70°C affect its magnetic strength, measured indirectly by counting the number of paper clips attracted by the magnet?",
          explanation: "This question includes specific ranges and measurement method, but doesn't mention control variables."
        },
        8: {
          title: "Level 8 Research Question",
          content: "How does the temperature of a magnet in the range of 10°C to 70°C affect its magnetic strength, measured indirectly by counting the number of paper clips attracted by the magnet, provided that the size, material and initial strength of the magnet as well as the material and size of the paper clips are kept constant?",
          explanation: "This is an excellent research question that includes the IV with range, DV with measurement method, and important control variables."
        }
      },
      experiment1: {
        title: "For the experiment on adding more magnets:",
        prompt: "Write a research question that investigates how the number of magnets stacked together affects the magnetic strength.",
        tips: [
          "Include a specific range for the number of magnets",
          "Specify how you'll measure magnetic strength",
          "Mention key control variables like magnet type and orientation"
        ]
      },
      experiment2: {
        title: "For the experiment on magnetic field interaction distance:",
        prompt: "Write a research question that investigates how the distance between magnets affects the strength of their interaction.",
        tips: [
          "Include a specific range for the distances you'll test",
          "Specify how you'll measure the interaction strength",
          "Mention key control variables like magnet types and orientation"
        ]
      }
    },
    2: {
      title: "Hypothesis",
      icon: <Beaker className="text-green-500" size={28} />,
      description: "A good hypothesis predicts the relationship between the variables and provides scientific reasoning for your prediction.",
      levels: {
        3: {
          title: "Level 3 Hypothesis",
          content: "If the temperature of the magnet increases then the strength of the magnet will decrease.",
          explanation: "This is a basic hypothesis that states the expected relationship but lacks details and reasoning."
        },
        4: {
          title: "Level 4 Hypothesis",
          content: "If the temperature of a magnet increases in the range of 10°C to 70°C then its magnetic strength will decrease because heat makes atoms vibrate more.",
          explanation: "This hypothesis includes a basic reason but lacks detailed scientific explanation."
        },
        6: {
          title: "Level 6 Hypothesis",
          content: "If the temperature of a magnet increases in the range of 10°C to 70°C then its magnetic strength will decrease, measured indirectly by counting the number of paper clips attracted by the magnet, because increasing temperature causes atomic vibrations that disrupt magnetic domains.",
          explanation: "This hypothesis includes more scientific reasoning and the measurement method."
        },
        8: {
          title: "Level 8 Hypothesis",
          content: "If the temperature of a magnet increases in the range of 10°C to 70°C then its magnetic strength will decrease, measured indirectly by counting the number of paper clips attracted by the magnet, provided that the size, material and initial strength of the magnet as well as the material and size of the paper clips are kept constant. This happens because magnetic materials rely on well-aligned magnetic domains to generate a strong magnetic field. As temperature increases, atoms vibrate more, and some domains shift out of alignment, weakening the overall field strength.",
          explanation: "This excellent hypothesis includes thorough scientific reasoning that explains the mechanism behind the predicted relationship."
        }
      },
      experiment1: {
        title: "For the experiment on adding more magnets:",
        prompt: "Write a hypothesis that predicts how adding more magnets will affect magnetic strength.",
        tips: [
          "Use the 'If...then...because...' format",
          "Make a clear prediction about the relationship",
          "Include scientific reasoning about magnetic fields combining",
          "Mention how you'll measure the effect"
        ]
      },
      experiment2: {
        title: "For the experiment on magnetic field interaction distance:",
        prompt: "Write a hypothesis that predicts how distance affects magnetic interaction strength.",
        tips: [
          "Use the 'If...then...because...' format",
          "Make a clear prediction about how increasing distance affects interaction",
          "Include scientific reasoning about how magnetic fields propagate through space",
          "Mention how you'll measure the interaction strength"
        ]
      }
    },
    3: {
      title: "Variables",
      icon: <Thermometer className="text-red-500" size={28} />,
      description: "Clearly identifying and defining your variables is crucial for a well-designed experiment.",
      levels: {
        3: {
          title: "Level 3 Variables",
          content: "• Independent Variable: Temperature of the magnet\n• Dependent variable: Strength of the magnet",
          explanation: "This just names the basic variables without details on range, measurement, or control."
        },
        4: {
          title: "Level 4 Variables",
          content: "• Independent variable: Temperature of the magnet. It will be manipulated between the range of 10°C to 70°C by adding magnets to cold water to achieve lower temperatures and hot water to achieve higher temperatures\n• Dependent variable: Strength of the magnet. Measured by counting the number of paper clips that attach to the magnets at different temperatures.\n• Control variables: Size, material and initial strength of the magnet. Size and material of paper clips",
          explanation: "This includes ranges and basic measurement methods, but lacks details on how controls will be maintained."
        },
        6: {
          title: "Level 6 Variables",
          content: "• Independent variable: Temperature of the magnet. It will be manipulated between the range of 10°C to 70°C. Values selected are 10°C, 30°C, 50°C and 70°C. The magnets will be dipped into cold water to achieve lower temperature and hot water for higher temperatures and its temperature will be measured with a thermometer.\n• Dependent variable: Strength of the magnet. Measured indirectly by counting the number of paper clips that attach to the magnets at different temperatures. There will be three trials for magnets at each temperature.\n• Control variables: Size, material and initial strength of the magnet by using bar magnets of the same batch. Size and material of paper clips by using it from the same box.",
          explanation: "This includes more detail on measurement methods and specific values, but could be more thorough on control variables."
        },
        8: {
          title: "Level 8 Variables",
          content: "• Independent variable:\n  ○ Temperature of the magnet.\n  ○ It will be manipulated between the range of 10°C to 70°C.\n  ○ Values selected are 10°C, 30°C, 50°C and 70°C.\n  ○ The magnets will be dipped into ice cold water. A thermometer will be placed in the water and the magnet will be pulled out once it reaches the temperature of 10°C\n  ○ The magnets will be dipped into water at 100°C. A thermometer will be placed in the water and the magnet will be pulled out once it reaches the temperature of 30°C, 50°C and 70°C\n\n• Dependent variable:\n  ○ Strength of the magnet.\n  ○ The magnet, once it achieves the desired temperature, will be brought closer to a paper clip.\n  ○ Once this attaches to the magnet then another paper clip will be brought closer to the first one and thus a line of paper clips will be formed.\n  ○ Measured indirectly by counting the number of paper clips that attach to the magnets at different temperatures.\n  ○ There will be three trials for the magnets at different temperatures.\n\n• Control variables:\n  ○ Bar magnets of the same size and material will be used for the experiment.\n  ○ The initial strength of the bar magnet can be tested by checking how many paper clips it can attract and the magnets with the same strength will be selected for the experiment.\n  ○ Paper Clips: The paper clips will be from the same box which will ensure same material and size.\n  ○ Temperature of the room: It will be controlled using the thermostat at the same temperature and confirmed using a thermometer.",
          explanation: "This comprehensive description includes detailed methods for manipulating the IV, measuring the DV, and maintaining control variables."
        }
      },
      experiment1: {
        title: "For the experiment on adding more magnets:",
        prompt: "Define the variables for your experiment on how adding more magnets affects magnetic strength.",
        tips: [
          "Clearly define your independent variable (number of magnets) with specific range",
          "Describe how you'll manipulate the IV (stacking? side by side?)",
          "Explain how you'll measure the dependent variable (magnetic strength)",
          "List all control variables and how you'll maintain them consistently"
        ]
      },
      experiment2: {
        title: "For the experiment on magnetic field interaction distance:",
        prompt: "Define the variables for your experiment on how distance affects magnetic interaction strength.",
        tips: [
          "Clearly define your independent variable (distance between magnets) with specific range",
          "Describe how you'll accurately measure and set different distances",
          "Explain how you'll measure the dependent variable (interaction strength)",
          "List all control variables and how you'll maintain them consistently"
        ]
      }
    },
    4: {
      title: "Methodology",
      icon: <Beaker className="text-purple-500" size={28} />,
      description: "A clear, logical, and detailed methodology ensures your experiment is reliable and replicable.",
      levels: {
        3: {
          title: "Level 3 Methodology",
          content: "Materials:\n• Bar magnets\n• Paper clips\n• Water\n• Thermometer\n\nSteps:\n1. Heat or cool the magnet to different temperatures.\n2. Test how many paper clips it can attract.\n3. Record the results.",
          explanation: "This is a very basic methodology that lacks detail on safety, specific procedures, and controls."
        },
        4: {
          title: "Level 4 Methodology",
          content: "Materials:\n• Bar magnets (same size, same material, and same initial strength)\n• Paper clips (from the same box to ensure uniform size and material)\n• Thermometer (to measure the magnet's temperature accurately)\n• Hot water bath (for heating the magnet to 30°C, 50°C, and 70°C)\n• Ice water bath (for cooling the magnet to 10°C)\n• Beakers (500 mL or more) (for holding hot and cold water)\n• Tongs or heat-resistant gloves (to handle hot magnets safely)\n\nSafety hazards and precautions:\n• Risk of Burns from Hot Water and Heated Magnet\n  ○ Hazard: The water used to heat the magnet (especially at 70°C) can cause burns, and the magnet itself can retain heat.\n  ○ Precaution: Use tongs or heat-resistant gloves when handling hot magnets.\n\n• Risk of Glass Breakage and Spillage\n  ○ Hazard: Sudden temperature changes can cause glass beakers to crack or break.\n  ○ Precaution: Use heat-resistant beakers and handle them carefully.",
          explanation: "This methodology includes better materials list and safety precautions, but still lacks detailed experimental steps."
        },
        6: {
          title: "Level 6 Methodology",
          content: "Materials: [Same as Level 4]\n\nSafety hazards and precautions: [Same as Level 4]\n\nSet-Up of the Experiment: \n• Gather all materials and equipment.\n• Set the room temperature using a thermostat.\n• Prepare two water baths:\n  - Ice water bath (10°C)\n  - Hot water bath (set to 70°C)\n\nMeasuring Magnetic Strength at Different Temperatures:\n1. Place the magnet in the ice water bath until it reaches 10°C.\n2. Remove the magnet and test how many paper clips it can attract.\n3. Record the number of paper clips.\n4. Repeat for temperatures of 30°C, 50°C, and 70°C.",
          explanation: "This methodology includes more complete experimental steps but could be more detailed and logical."
        },
        8: {
          title: "Level 8 Methodology",
          content: "Materials: [Same as Level 4]\n\nSafety hazards and precautions: [Same as Level 4]\n\nSet-Up of the Experiment: \n• Gather all materials and equipment, ensuring that the magnets are of the same size, material, and initial strength by pre-testing how many paper clips they can attract at room temperature.\n• Set the room temperature using a thermostat and confirm with a thermometer to maintain consistency.\n• Prepare two water baths:\n  - Ice water bath (10°C) – Fill a beaker with ice water and use a thermometer to monitor the temperature.\n  - Hot water bath (set to 70°C) – Fill another beaker with water and heat it using a controlled heat source. Adjust until the thermometer reads 70°C.\n\nMeasuring Magnetic Strength at 10°C (Ice Water Bath):\n1. Place the first magnet in the ice water bath.\n2. Use a thermometer to check when the magnet's temperature reaches 10°C.\n3. Quickly remove the magnet using tongs and immediately bring it close to a paper clip.\n4. Once the first paper clip is attached, bring another paper clip close to the first one and observe how many paper clips form a chain.\n5. Record the number of paper clips attracted.\n6. Repeat steps 1 to 5 for three trials and calculate the average number of paper clips attracted.\n\nMeasuring Magnetic Strength at 30°C, 50°C, and 70°C (Hot Water Bath):\n7. Place the second magnet in a hot water bath.\n8. Use a thermometer to check when the magnet's temperature reaches 30°C.\n9. Quickly remove the magnet using tongs and repeat steps 4-6 (test and record paper clip attraction).\n10. Repeat steps 7, 8 and 9 for 50°C and 70°C",
          explanation: "This comprehensive methodology includes detailed step-by-step instructions, safety precautions, and specific procedures for each temperature."
        }
      },
      experiment1: {
        title: "For the experiment on adding more magnets:",
        prompt: "Develop a detailed methodology for your experiment on how adding more magnets affects magnetic strength.",
        tips: [
          "List all materials and equipment needed",
          "Include safety precautions specific to working with multiple magnets",
          "Provide step-by-step instructions for setting up and conducting the experiment",
          "Explain how you'll ensure consistent measurements across different magnet configurations",
          "Include multiple trials to ensure reliability"
        ]
      },
      experiment2: {
        title: "For the experiment on magnetic field interaction distance:",
        prompt: "Develop a detailed methodology for your experiment on how distance affects magnetic interaction strength.",
        tips: [
          "List all materials and equipment needed, including distance measurement tools",
          "Include safety precautions",
          "Provide step-by-step instructions for setting up and measuring different distances",
          "Explain how you'll ensure consistent orientation of magnets",
          "Include multiple trials to ensure reliability"
        ]
      }
    }
  };

  // Function to determine what content to display based on the active strand and tab
  const renderContent = () => {
    const strand = strandContent[activeStrand];
    
    if (activeTab === 'guided') {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            {strand.icon} {strand.title}
          </h2>
          <p className="text-gray-700 mb-6">{strand.description}</p>
          
          <div className="space-y-4">
            {[3, 4, 6, 8].map(level => (
              <div key={level} className="border rounded-lg overflow-hidden">
                <div 
                  className={`p-3 flex justify-between items-center cursor-pointer ${expandedLevels[`${activeStrand}-${level}`] ? 'bg-blue-50' : 'bg-gray-50'}`}
                  onClick={() => toggleLevel(activeStrand, level)}
                >
                  <h3 className="font-semibold">{strand.levels[level].title}</h3>
                  {expandedLevels[`${activeStrand}-${level}`] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                
                {expandedLevels[`${activeStrand}-${level}`] && (
                  <div className="p-4 border-t">
                    <div className="bg-gray-50 p-3 rounded mb-3 whitespace-pre-wrap">
                      {strand.levels[level].content}
                    </div>
                    <p className="text-sm text-gray-600">{strand.levels[level].explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeTab === 'own' && chosenExperiment) {
      const experimentContent = chosenExperiment.id === 1 ? strand.experiment1 : strand.experiment2;
      const strandKey = ['research', 'hypothesis', 'variables', 'methodology'][activeStrand - 1];
      
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            {strand.icon} {strand.title}
          </h2>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">{experimentContent.title}</h3>
            <p className="text-gray-700 mb-4">{experimentContent.prompt}</p>
            
            <textarea
              className="w-full h-60 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={userInput[strandKey]}
              onChange={(e) => handleInputChange(strandKey, e.target.value)}
              placeholder={`Write your ${strand.title.toLowerCase()} here...`}
            ></textarea>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Tips:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {experimentContent.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  const level = gradeStrand(strandKey);
                  if (level >= 6) {
                    completeStrand(`strand${activeStrand}`);
                  }
                  alert(`Your ${strand.title} is currently at Level ${level}. ${level >= 6 ? 'Great job!' : 'Keep improving to reach Level 6 or higher!'}`);
                }}
              >
                Check My Work
              </button>
              
              {strandLevel[strandKey] > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-semibold">
                    Current level: <span className="text-blue-600">{strandLevel[strandKey]}</span>
                    {strandLevel[strandKey] >= 6 && <Check className="inline-block ml-2 text-green-500" size={16} />}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Choose Your Experiment</h2>
          <p className="text-gray-700 mb-6">Select one of the experiments below to begin your lab report.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiments.map(exp => (
              <div 
                key={exp.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition"
                onClick={() => setChosenExperiment(exp)}
              >
                <div className="flex justify-center mb-3">
                  {exp.icon}
                </div>
                <h3 className="font-semibold mb-2">{exp.title}</h3>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Scientific Lab Report Guide: MYP Criteria B</h1>
          <p className="text-blue-100">Learn how to write an excellent lab report step by step</p>
        </div>
      </header>
      
      {/* Progress bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map(strand => (
              <button
                key={strand}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeStrand === strand ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveStrand(strand)}
              >
                {strand === 1 && <Compass size={18} />}
                {strand === 2 && <Beaker size={18} />}
                {strand === 3 && <Thermometer size={18} />}
                {strand === 4 && <Beaker size={18} />}
                Strand {strand}
                {badges[`strand${strand}`] && <Award className="text-yellow-500" size={16} />}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b flex">
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'guided' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('guided')}
            >
              Guided Example
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'own' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('own')}
            >
              Your Experiment
            </button>
          </div>
          
          {/* Content area */}
          {renderContent()}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="container mx-auto p-4 flex justify-between">
        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeStrand > 1 ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          onClick={() => activeStrand > 1 && setActiveStrand(activeStrand - 1)}
          disabled={activeStrand <= 1}
        >
          <ArrowLeft size={16} /> Previous Strand
        </button>
        
        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeStrand < 4 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          onClick={() => activeStrand < 4 && setActiveStrand(activeStrand + 1)}
          disabled={activeStrand >= 4}
        >
          Next Strand <ArrowRight size={16} />
        </button>
      </div>
      
      {/* Badges earned */}
      <div className="bg-white border-t">
        <div className="container mx-auto p-4">
          <h2 className="text-lg font-semibold mb-2">Your Progress</h2>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map(strand => (
              <div key={strand} className="text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${badges[`strand${strand}`] ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                  {badges[`strand${strand}`] 
                    ? <Star className="text-yellow-500" size={18} /> 
                    : strand}
                </div>
                <p className={`text-sm mt-1 ${badges[`strand${strand}`] ? 'text-yellow-600' : 'text-gray-500'}`}>
                  {badges[`strand${strand}`] ? 'Completed' : 'In Progress'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Completion modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
              <p className="text-gray-700 mb-6">
                You've successfully completed all four strands of the lab report! Your work demonstrates a strong understanding of scientific inquiry.
              </p>
              <div className="flex gap-2 justify-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Star size={14} className="text-yellow-500" /> Research Question
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Star size={14} className="text-yellow-500" /> Hypothesis
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Star size={14} className="text-yellow-500" /> Variables
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Star size={14} className="text-yellow-500" /> Methodology
                </span>
              </div>
              <div className="mt-6">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => {
                    setShowCompletionModal(false);
                    // Reset if needed
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;