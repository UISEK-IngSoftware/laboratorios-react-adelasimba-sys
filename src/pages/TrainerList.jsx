import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, CardMedia, IconButton, Button, Box } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchTrainers, deleteTrainer } from '../services/trainerService';
import Spinner from '../components/Spinner';

export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('access_token') !== null;
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    const getImageUrl = (img) => {
        if (!img) return 'https://via.placeholder.com/200';
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        return `${mediaUrl}/${img}`;
    };

    const loadTrainers = async () => {
        setLoading(true);
        try {
            const data = await fetchTrainers();
            setTrainers(data);
        } catch (err) {
            console.error("Error al cargar entrenadores:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTrainers();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar a este entrenador?")) {
            try {
                await deleteTrainer(id);
                setTrainers(trainers.filter(t => t.id !== id));
            } catch (err) {
                console.error("Error al eliminar:", err);
                alert("No se pudo eliminar al entrenador");
            }
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
                <Typography variant="h4">
                    Lista de Entrenadores
                </Typography>
                
                {isLoggedIn && (
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<Add />}
                        onClick={() => navigate('/add-trainer')}
                    >
                        Nuevo Entrenador
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {trainers.map((trainer) => (
                    <Grid key={trainer.id} size xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={getImageUrl(trainer.picture)}
                                alt={trainer.first_name}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    {trainer.first_name} {trainer.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Nivel: {trainer.level} | Fecha: {trainer.birth_date}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {isLoggedIn && (
                                    <>
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/edit-trainer/${trainer.id}`)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(trainer.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}