import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Add this NavButton component somewhere above your Explore function
const NavButton = ({ children, startIcon, onClick }) => (
  <Button
    startIcon={startIcon}
    onClick={onClick}
    sx={{
      color: "#000080", // navy default
      fontWeight: "bold",
      textTransform: "none",
      position: "relative",
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "0%",
        height: "2px",
        backgroundColor: "#FF9933", // saffron underline
        transition: "width 0.3s ease",
      },
      "&:hover": {
        color: "hsla(115, 89%, 20%, 1.00)", // green text hover
      },
      "&:hover::after": {
        width: "100%",
      },
    }}
  >
    {children}
  </Button>
);


const skills = ["Web Developer","React","Next.js","HTML","CSS","JavaScript","Node.js","Python","Django","Full Stack Development","Frontend Development","Backend Development","Data Science","Machine Learning","AI","Data Analysis","SQL","R","BI","Content Writing","Social Media","Graphic Design","Video Editing","UI/UX Design","Digital Marketing","SEO","Copywriting","Research","Business Development","Market Research","HR","Finance","Project Management","Operations","Sales"];
const sectors = ["Technology","Healthcare","Education","Finance","Marketing","Government","Biotech","Pharma","Medical Devices","Telehealth","Online Learning","Academic Research","Banking","Investment Banking","Accounting","Financial Planning","Advertising","PR","Non-profit","Consulting","Media & Entertainment","Manufacturing"];
const internshipTypes = ["Hybrid","Onsite","Remote"];

export default function Explore() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [internshipType, setInternshipType] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleGetRecommendations = async () => {
    if (selectedSkills.length === 0 && selectedSectors.length === 0 && !internshipType) {
      alert("Select at least one skill, sector, or type!");
      return;
    }
    setLoading(true); setError("");
    try {
      const res = await fetch("https://pulastya0-sih-ml-backend.hf.space/profile-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: selectedSkills, sectors: selectedSectors, internshipType }),
      });
      if (!res.ok) throw new Error("Failed to fetch internships");
      const data = await res.json();
      setResults(data.recommendations || []);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const toggleSkill = (skill) => setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  const toggleSector = (sector) => setSelectedSectors(prev => prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]);
  const filteredSkills = skills.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSectors = sectors.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fb", overflowX: "hidden" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          width: "100vw",
          margin: 0,
          px: 3,
          py: 1.5,
          boxSizing: "border-box",
          background: "linear-gradient(90deg, #FF9933, #FFFFFF, #138808)",
          color: "#000080",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 0 }}>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Stack direction="row" spacing={2}>
  <NavButton startIcon={<HomeIcon />} onClick={() => navigate("/home")}>Home</NavButton>
  <NavButton startIcon={<InfoIcon />} onClick={() => navigate("/about")}>About</NavButton>
  <NavButton startIcon={<LogoutIcon />} onClick={() => navigate("/login")}>Logout</NavButton>
</Stack>

        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: "blur(14px)",
            background: "#ffffffcc",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
          }}
        >
          <Avatar sx={{ bgcolor: "#000080", width: 60, height: 60, m: "0 auto", mb: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Tell Us About Yourself
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 3 }}>Help us find the perfect internship matches ✨</Typography>

          {/* Skills search */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Your Skills</Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} />, sx: { width: 250 } }}
            />
          </Box>

          <Grid container spacing={1} sx={{ mb: 3 }}>
            {filteredSkills.map(skill => (
              <Grid item key={skill}>
                <Chip
                  label={skill}
                  clickable
                  color={selectedSkills.includes(skill) ? "primary" : "default"}
                  onClick={() => toggleSkill(skill)}
                  sx={{
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05)", backgroundColor: "#138808", color: "#fff" }
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Sectors */}
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Interested Sectors</Typography>
          <Grid container spacing={1} sx={{ mb: 3 }}>
            {filteredSectors.map(sector => (
              <Grid item key={sector}>
                <Chip
                  label={sector}
                  clickable
                  color={selectedSectors.includes(sector) ? "primary" : "default"}
                  onClick={() => toggleSector(sector)}
                  sx={{
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05)", backgroundColor: "#138808", color: "#fff" }
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Internship Type */}
          <TextField
            select
            label="Internship Type"
            value={internshipType}
            onChange={(e) => setInternshipType(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          >
            {internshipTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
          </TextField>

          {/* Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleGetRecommendations}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #FF9933, #138808)",
              "&:hover": { background: "linear-gradient(90deg, #000080, #138808)", transform: "scale(1.03)" },
            }}
          >
            {loading ? "Finding internships..." : "Get My Internship Recommendations"}
          </Button>

          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

          {results.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Recommended Internships:</Typography>
              <ul>
                {results.map((internship, i) => (
                  <li key={i}><strong>{internship.title}</strong> — {internship.company}</li>
                ))}
              </ul>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
