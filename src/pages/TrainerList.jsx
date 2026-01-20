import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchTrainers, deleteTrainer } from '../services/trainerService';

export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('access_token') !== null;
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    useEffect(() => {
        loadTrainers();
    }, []);

    const loadTrainers = async () => {
        try {
            const data = await fetchTrainers();
            setTrainers(data);
        } catch (err) {
            console.error("Error al cargar entrenadores:", err);
        }
    };

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
            <Typography variant="h4" sx={{ my: 3 }}>Lista de Entrenadores</Typography>
            <Grid container spacing={3}>
                {trainers.map((trainer) => (
                    <Grid item key={trainer.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={trainer.picture ? `${mediaUrl}/${trainer.picture}` : 'https://via.placeholder.com/200'}
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
                                {/* Botones protegidos por login */}
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