//Examen Parcial 2
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTrainer, updateTrainer, fetchTrainers } from "../services/trainerService";

export default function TrainerForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [trainerData, setTrainerData] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        level: 1,
        picture: null
    });

    useEffect(() => {
        if (isEdit) {
            fetchTrainers().then(data => {
                const trainer = data.find(t => t.id === parseInt(id));
                if (trainer) {
                    setTrainerData({ 
                        first_name: trainer.first_name,
                        last_name: trainer.last_name,
                        birth_date: trainer.birth_date,
                        level: trainer.level,
                        picture: null 
                    });
                }
            }).catch(err => {
                console.error("Error al cargar entrenador:", err);
            });
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture') {
            setTrainerData({ ...trainerData, picture: files[0] });
        } else {
            setTrainerData({ ...trainerData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await updateTrainer(id, trainerData);
                alert("Entrenador actualizado exitosamente");
            } else {
                await addTrainer(trainerData);
                alert("Entrenador agregado exitosamente");
            }
            navigate('/trainers');
        } catch (err) { 
            console.error("Error en la operación del entrenador:", err);
            alert("Ocurrió un error al procesar los datos");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
                {isEdit ? "Editar Entrenador" : "Nuevo Entrenador"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nombre" name="first_name" value={trainerData.first_name} onChange={handleChange} required />
                <TextField label="Apellido" name="last_name" value={trainerData.last_name} onChange={handleChange} required />
                <TextField 
                    label="Fecha de Nacimiento" 
                    name="birth_date" 
                    type="date" 
                    value={trainerData.birth_date} 
                    onChange={handleChange} 
                    InputLabelProps={{ shrink: true }} 
                    required 
                />
                <TextField label="Nivel" name="level" type="number" value={trainerData.level} onChange={handleChange} />
                
                <Typography variant="body2" color="text.secondary">Foto del Entrenador:</Typography>
                <input type="file" name="picture" onChange={handleChange} />
                
                <Button variant="contained" type="submit" color="primary">Guardar</Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/trainers')}>
                    Cancelar
                </Button>
            </Box>
        </Container>
    );
}