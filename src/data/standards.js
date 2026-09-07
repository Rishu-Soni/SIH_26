export const INDIAN_STANDARDS = {
  "is-456": {
    id: "is-456",
    code: "IS 456 : 2000",
    title: "Plain and Reinforced Concrete — Code of Practice",
    subtitle: "National Building Code of India Framework Ref: Part 6 / Sec 5",
    category: "ICS 91.100.30 Concrete & Concrete Products",
    reaffirmation: "Reaffirmed 2021 (Fourth Revision)",
    isQcoApplicable: true,
    description: "Standardization baseline governing structural design, material batching, durability limits, and safety verification across the Republic of India.",
    executiveSummary: "This benchmark Indian Standard sets down minimum code requirements for the design, durability, construction tolerances, and structural acceptance of unreinforced plain and cast-in-place or precast reinforced concrete structures. It firmly establishes the Limit State Design Method as the governing design philosophy (incorporating Limit State of Collapse for flexure, compression, shear, and torsion, paired with Limit State of Serviceability against deflection and cracking). Critical mandates cover exposure classification from Mild to Extreme marine/chemical environments, defining non-negotiable water-cement ratio ceilings and minimum binder contents.",
    interlinkedStandards: [
      { code: "IS 269", title: "Ordinary Portland Cement, 33/43/53 Grade", description: "Mandatory Binder Specs" },
      { code: "IS 1786", title: "High Strength Deformed Steel Bars (TMT)", description: "Fe 415 / 500 / 550D / 600 Rebar" },
      { code: "IS 383", title: "Coarse and Fine Aggregates", description: "Natural & Manufactured M-Sand" },
      { code: "IS 10262", title: "Concrete Mix Proportioning Guidelines", description: "Target Characteristic Strength" }
    ],
    clauses: [
      { clause: "Cl. 5", title: "Materials, Workmanship, Inspection and Testing", description: "Includes cement grading, mineral admixtures (fly ash, silica fume), and aggregate testing protocols." },
      { clause: "Cl. 26", title: "Requirements of Reinforcement and Structural Detailing", description: "Bar spacing rules, minimum/maximum steel percentage, curtailment, and lap splice formulas." },
      { clause: "Cl. 35", title: "Limit State Design Architecture (Ultimate & Serviceability)", description: "Partial safety factors for loads (1.5 DL + 1.5 LL) and materials (γm = 1.5 for concrete, 1.15 for steel)." },
      { clause: "Cl. 40", title: "Minimum Nominal Concrete Cover (Durability Enforced)", description: "Table 16 compliance: 20mm (Mild) up to 75mm (Extreme) to prevent corrosion attack.", isDurability: true }
    ],
    activeAmendments: [
      "No. 1 (2001)",
      "No. 2 (2005)",
      "No. 3 (2007)",
      "No. 4 (2013)",
      "No. 5 (2019 Incorporating Fly Ash Limits)"
    ],
    pdfLinkText: "View Official Watermarked PDF (114 Pages)",
    dossier: {
      techComm: "CED 2",
      techCommTitle: "Cement and Concrete",
      volume: "114 Pages",
      gazetteRef: "No. 238-E",
      gazetteTitle: "Central Govt Mirror",
      hash: "SHA-256 #891C"
    },
    rmcLicenses: {
      title: "Active RMC / Batching Licenses",
      value: "1,842 Plants Live",
      compliantPct: 88,
      pendingPct: 12
    }
  },
  "is-800": {
    id: "is-800",
    code: "IS 800 : 2007",
    title: "General Construction in Steel — Code of Practice",
    subtitle: "National Building Code of India Framework Ref: Part 6 / Sec 6",
    category: "ICS 77.140.01 Iron and Steel Products",
    reaffirmation: "Reaffirmed 2022 (Third Revision)",
    isQcoApplicable: true,
    description: "General code of practice governing structural steel design, connection detailing, and seismic design rules using limit states across India.",
    executiveSummary: "This standard applies to the design, fabrication, and erection of structural steelwork using the Limit State Design Method. It lays down instructions for bolt and weld connections, slenderness ratio checks for tension and compression members, lateral torsional buckling rules for beams, and dynamic framing criteria. Crucial factors specify plate girder design, plastic analysis, and durability allowances against high corrosion risks.",
    interlinkedStandards: [
      { code: "IS 2062", title: "Hot Rolled Medium and High Tensile Structural Steel", description: "Structural Steel Grades" },
      { code: "IS 1367", title: "Technical Supply Conditions for Threaded Fasteners", description: "High-Strength Bolts & Nuts" },
      { code: "IS 816", title: "Metal Arc Welding in General Construction", description: "Welding Electrode Specs" },
      { code: "IS 1161", title: "Steel Tubes for Structural Purposes", description: "Hollow Section Standards" }
    ],
    clauses: [
      { clause: "Cl. 5", title: "General Design Requirements & Serviceability Limits", description: "Maximum deflection, structural stability, dynamic effects, and corrosion allowance details." },
      { clause: "Cl. 7", title: "Design of Tension Members (Effective Area & Sectional Limits)", description: "Net section rupture, block shear failure calculations, and slenderness constraints." },
      { clause: "Cl. 8", title: "Design of Compression Members (Column Buckling curves)", description: "Effective length, axial compression resistance, and categorization into column curves (a, b, c, d)." },
      { clause: "Cl. 10", title: "Connections (Bolting, Welding, and Tension Joints)", description: "Shear/bearing bolts, welding size limits, weld efficiency factors, and joint detailing rules.", isDurability: true }
    ],
    activeAmendments: [
      "No. 1 (2012)",
      "No. 2 (2015)",
      "No. 3 (2018 Incorporating Fire Protection Guidelines)"
    ],
    pdfLinkText: "View Official Watermarked PDF (138 Pages)",
    dossier: {
      techComm: "CED 7",
      techCommTitle: "Structural Steel Sections",
      volume: "138 Pages",
      gazetteRef: "No. 102-S",
      gazetteTitle: "Central Govt Mirror",
      hash: "SHA-256 #A49F"
    },
    rmcLicenses: {
      title: "Certified Fabrication Plants",
      value: "954 Fabricators Live",
      compliantPct: 91,
      pendingPct: 9
    }
  },
  "is-1893": {
    id: "is-1893",
    code: "IS 1893 (Part 1) : 2016",
    title: "Criteria for Earthquake Resistant Design of Structures — General Provisions and Buildings",
    subtitle: "National Building Code of India Framework Ref: Part 6 / Sec 1",
    category: "ICS 91.120.25 Seismic and Vibration Protection",
    reaffirmation: "Reaffirmed 2021 (Sixth Revision)",
    isQcoApplicable: true,
    description: "Seismic acceleration baseline, zone factors, soil coefficients, and structural response spectra for seismic loading.",
    executiveSummary: "This critical standard provides the formulas, seismic zone map, and design acceleration spectra used to evaluate earthquake forces on buildings and structures in India. It defines Zones II, III, IV, and V with corresponding Zone Factors (Z). Design philosophy mandates preventing collapse under Maximum Considered Earthquake (MCE) and limiting structural damage under Design Basis Earthquake (DBE). Uses response reduction factors and soil coefficients (Types I, II, III) to determine Sa/g.",
    interlinkedStandards: [
      { code: "IS 13920", title: "Ductile Detailing of RCC Structures for Seismic Forces", description: "Mandatory Detailing Code" },
      { code: "IS 4326", title: "Earthquake Resistant Design of Buildings", description: "Low-cost masonry & frame guidelines" },
      { code: "IS 1893 (Pt 4)", title: "Industrial Structures & Stack-like chimneys", description: "Industrial Seismic Criteria" },
      { code: "IS 1893 (Pt 2)", title: "Liquid Retaining Elevated & Ground Tanks", description: "Water Tank Seismic Design" }
    ],
    clauses: [
      { clause: "Cl. 6", title: "General Principles & Design Load Combinations", description: "Load combinations with gravity, wind, and seismic forces (e.g., 1.2 DL + 1.2 LL + 1.2 EQ)." },
      { clause: "Cl. 7", title: "Equivalent Static Method for Lateral Force", description: "Calculation of Design Seismic Base Shear (Vb = Ah * W) and vertical distribution of forces." },
      { clause: "Cl. 8", title: "Design Response Acceleration Spectrum", description: "Sa/g values based on Soil Classification and fundamental natural period (Ta)." },
      { clause: "Cl. 11", title: "Dynamic Analysis Requirements (Response Spectrum/Time History)", description: "Mandatory for buildings taller than 40m in Zone IV/V or irregular buildings.", isDurability: true }
    ],
    activeAmendments: [
      "No. 1 (2018)",
      "No. 2 (2020 Amendment on Ductility Scaling)"
    ],
    pdfLinkText: "View Official Watermarked PDF (44 Pages)",
    dossier: {
      techComm: "CED 39",
      techCommTitle: "Earthquake Engineering",
      volume: "44 Pages",
      gazetteRef: "No. 312-E",
      gazetteTitle: "Central Govt Mirror",
      hash: "SHA-256 #D221"
    },
    rmcLicenses: {
      title: "Seismic Design Compliant Agencies",
      value: "642 Design Offices",
      compliantPct: 95,
      pendingPct: 5
    }
  },
  "is-13920": {
    id: "is-13920",
    code: "IS 13920 : 2016",
    title: "Ductile Design and Detailing of RCC Structures Subjected to Seismic Forces",
    subtitle: "National Building Code of India Framework Ref: Part 6 / Sec 1B",
    category: "ICS 91.120.25 Seismic Protection & Reinforced Concrete",
    reaffirmation: "Reaffirmed 2021 (Third Revision)",
    isQcoApplicable: true,
    description: "Mandatory structural reinforcement detailing specifications to survive strong ground motions in High Seismic Zones.",
    executiveSummary: "This standard specifies detailing requirements for reinforced concrete structures subjected to earthquake forces, ensuring high dissipation capability and ductility. It is mandatory for structures in Seismic Zones III, IV, and V. Highlights include 135-degree hoops with 10d extensions, beam-column connection confinement, minimum dimensions of columns, reinforcement ratios, and special shear wall detailing.",
    interlinkedStandards: [
      { code: "IS 456", title: "Plain and Reinforced Concrete - Code of Practice", description: "Parent Concrete Code" },
      { code: "IS 1786", title: "High Strength Deformed Steel Bars for Concrete", description: "Deformed bar specifications" },
      { code: "IS 1893", title: "Criteria for Earthquake Resistant Design of Structures", description: "Seismic Loading Baseline" },
      { code: "IS 5525", title: "Recommendations for Detailing of Reinforcement in RC", description: "RC Detailing Principles" }
    ],
    clauses: [
      { clause: "Cl. 6", title: "Flexural Members / Beams Detailing Criteria", description: "Minimum tension steel ratios, splice positioning guidelines, and confinement spacing in plastic hinges." },
      { clause: "Cl. 7", title: "Columns and Compression Members (Confinement Hoops)", description: "Minimum cross-sectional dimension of 300mm, lap-splice positions, and close-spaced hoop zones." },
      { clause: "Cl. 8", title: "Beam-Column Connections (Joint Confinement)", description: "Continuous shear reinforcement inside the joint core to prevent brittle diagonal cracking." },
      { clause: "Cl. 9", title: "Special Shear Walls Design & detailing requirements", description: "Boundary elements with closely spaced transverse ties, web reinforcement ratios, and splices.", isDurability: true }
    ],
    activeAmendments: [
      "No. 1 (2018)",
      "No. 2 (2021 Incorporating High-Strength Steel Grades)"
    ],
    pdfLinkText: "View Official Watermarked PDF (28 Pages)",
    dossier: {
      techComm: "CED 39",
      techCommTitle: "Earthquake Engineering",
      volume: "28 Pages",
      gazetteRef: "No. 411-C",
      gazetteTitle: "Central Govt Mirror",
      hash: "SHA-256 #902B"
    },
    rmcLicenses: {
      title: "Audited Seismic Structural Audits",
      value: "1,120 Buildings Registered",
      compliantPct: 92,
      pendingPct: 8
    }
  }
};
