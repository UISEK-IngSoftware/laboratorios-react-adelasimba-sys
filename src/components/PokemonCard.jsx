import { Button, Card, CardActions, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

//Examen Parcial 2
//Condicionales y botones

export default function PokemonCard({ pokemon, onDelete }) {
    const navigate = useNavigate();
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    const imagePath = `${mediaUrl}/${pokemon.picture}`;
    
    // Verificar si el usuario está logueado para mostrar/ocultar botones
    const isLoggedIn = localStorage.getItem('access_token') !== null;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height={200}
                image={imagePath}
                alt={pokemon.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tipo: {pokemon.type}
                </Typography>
            </CardContent>
            
            <CardActions>
                <Button size="small">Ver más</Button>
                
                {/* Mostrar u ocultar botones */}
                {isLoggedIn && (
                    <>
                        <IconButton 
                            color="primary" 
                            onClick={() => navigate(`/edit-pokemon/${pokemon.id}`)}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton 
                            color="error" 
                            onClick={() => onDelete(pokemon.id)}
                        >
                            <Delete />
                        </IconButton>
                    </>
                )}
            </CardActions>
        </Card>
    );
}



