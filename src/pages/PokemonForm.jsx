import { Box, Button, TextField, Typography } from "@mui/material";

export default function PokemonForm() {
    return(
        <>
            <Typography variant="h4" gutterBottom>
                Formulario de Pokemon.
            </Typography>
            <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
               <TextField label="Nombre" name="name" variant="outlined" />
               <TextField label="Tipo" name="type" variant="outlined" /> 
               <TextField label="Peso" name="weight" variant="outlined" />
               <TextField label="Altura" name="height" variant="outlined" />
               <input type="file" name="picture" />
               <Button variant="contained" type="submit">Guardar</Button>
            </Box>
            

        </>
    );
}