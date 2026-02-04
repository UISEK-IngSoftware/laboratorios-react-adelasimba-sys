import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createTrainer, getTrainer, updateTrainer } from '../services/trainerService';
import Spinner from '../components/Spinner';

export default function TrainerForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        level: 1,
        picture: null 
    });
    const [preview, setPreview] = useState(null); 
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const loadData = async () => {
            if (id) {
                setLoading(true);
                try {
                    const data = await getTrainer(id);
                    setFormData(data);
                } catch (error) {
                    console.error("Error cargando entrenador", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        loadData();
    }, [id]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, picture: reader.result });
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateTrainer(id, formData);
            } else {
                await createTrainer(formData);
            }
            navigate('/trainers');
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar el entrenador");
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    {id ? 'Editar Entrenador' : 'Nuevo Entrenador'}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Apellido"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Fecha de Nacimiento"
                        name="birth_date"
                        type="date"
                        value={formData.birth_date}
                        onChange={handleChange}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Nivel"
                        name="level"
                        type="number"
                        value={formData.level}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            Foto del Entrenador:
                        </Typography>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'block', marginBottom: '10px' }}
                        />
                        
                        {(preview || (formData.picture && typeof formData.picture === 'string')) && (
                            <Box sx={{ mt: 1, textAlign: 'center' }}>
                                <img 
                                    src={preview || formData.picture} 
                                    alt="Vista previa" 
                                    style={{ maxHeight: '150px', borderRadius: '4px', border: '1px solid #ddd' }} 
                                />
                            </Box>
                        )}
                    </Box>

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2, py: 1.5 }}
                    >
                        {id ? 'Guardar Cambios' : 'Agregar Entrenador'}
                    </Button>

                    <Button 
                        variant="outlined" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2, py: 1.5 }}
                        onClick={() => navigate('/trainers')}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}