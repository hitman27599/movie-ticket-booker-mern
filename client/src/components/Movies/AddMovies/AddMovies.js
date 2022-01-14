import React from 'react';
import {Grid,Typography,Button,TextField,Paper,Slider,Table,TableHead,TableCell,TableRow,TableBody} from '@material-ui/core';
import {useForm,FormProvider} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import './AddMovies.css';
import Axios from 'axios';

const AddMovies = () => {

    const navigate = useNavigate();
    const options = [1,2,3,4,5,6,7,8,9,10];
    const {register,handleSubmit} = useForm();
    let abc='a';
    let num=1;
    
    const Sel = ({name}) =>{
        return (
            <select name={name} {...register(name)}>
                                        {options.map((value,index)=>(
                                            <option key={index} value={value}>{value}</option>
                                        ))}
                                    </select>
        )
    }

    const onAdd = (data) =>{
        console.log(data);
        let seatmatrix= [
            {seatsleft:{row:data.seatsleftrow,col:data.seatsleftcol,price:data.priceseatsleft}},
            {seatsright:{row:data.seatsrightrow,col:data.seatsrightcol,price:data.priceseatsright}},
            {belowseatsright:{row:data.belowseatsrightrow,col:data.belowseatsrightcol,price:data.pricebelowseatsright}},
            {belowseatsleft:{row:data.belowseatsleftrow,col:data.belowseatsleftcol,price:data.pricebelowseatsleft}},
        ];
        const seat1 = {};
        seatmatrix.forEach((seat)=>{
            for(let key in seat){
                let sr= Object.values(seat[key]);
                const row = parseInt(sr[0]);
                const col = parseInt(sr[1]);
                const price = sr[2];
                let s = [];
                for(let i=0;i<row;i++){
                    let t=[];
                    for(let j=0;j<col;j++){
                        let val = abc+ num;
                        t.push({seatNo:val,isBooked:"false",price:parseInt(price)})
                        num++;
                        if(num>20){
                            abc=String.fromCharCode(abc.charCodeAt(0)+1);
                            num=1;
                        }
                    }
                    s.push(t);
                }
                switch(key){
                    case "seatsleft" : {
                        seat1.seatsleft=s;
                        break;
                    }
                    case "seatsright" : {
                        seat1.seatsright=s;
                        break;
                    }
                    case "belowseatsright" : {
                        seat1.belowseatsright=s;
                        break;
                    }
                    case "belowseatsleft" : {
                        seat1.belowseatsleft=s;
                        break;
                    }
                    default :{
                        break;
                    }

                }

            }
        })
        console.log(seat1);
        Axios.post("/api/movies",{
            name:data.name,
            date:data.date,
            time:data.time,
            image:data.image,
            seats:seat1
        })
        .then((data)=>{
            console.log(data);
            alert("movie added");
            navigate('/');
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    return (
        <div>
            <div className="container">
                <Paper className="form-container" elevation={3}>
                    <div className="heading">
                        <Typography variant="h6" gutterBottom>
                            Add Movie
                        </Typography>
                    </div>
                    <FormProvider >
                        <form onSubmit={handleSubmit((data)=>onAdd(data))}>
                            <Grid container spacing={3}>
                                <Grid container item xs={12} sm={6} >
                                    <TextField fullWidth required {...register("name")} name="name" label="movie name"/>
                                </Grid>
                                <Grid container item xs={12} sm={6} >
                                    <TextField fullWidth required {...register("date")} name="date" label="date(yyyy-mm-dd)"/>
                                </Grid>
                                <Grid container item xs={12} sm={6} >
                                    <TextField fullWidth required {...register("time")} name="time" label="movie time"/>
                                </Grid>
                                <Grid container item xs={12} sm={6} >
                                    <TextField fullWidth required {...register("image")} name="image" label="movie poster link"/>
                                </Grid>

                            </Grid>
                            <div className="heading">
                                <Typography variant="h6" gutterBottom>
                                    Movie Tickets
                                </Typography>
                            </div>
                            <Grid container spacing={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>rows</TableCell>
                                            <TableCell>columns</TableCell>
                                            <TableCell>price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>upper left</TableCell>
                                            <TableCell><Sel name={"seatsleftrow"} /></TableCell>
                                            <TableCell><Sel name={"seatsleftcol"} /></TableCell>
                                            <TableCell><TextField {...register("priceseatsleft")} name="priceseatsleft" size="small"/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>upper right</TableCell>
                                            <TableCell><Sel name={"seatsrightrow"} /></TableCell>
                                            <TableCell><Sel name={"seatsrightcol"} /></TableCell>
                                            <TableCell><TextField {...register("priceseatsright")} name="priceseatsright" size="small"/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>below left</TableCell>
                                            <TableCell><Sel name={"belowseatsleftrow"} /></TableCell>
                                            <TableCell><Sel name={"belowseatsleftcol"} /></TableCell>
                                            <TableCell><TextField {...register("pricebelowseatsleft")} name="pricebelowseatsleft" size="small"/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>below right</TableCell>
                                            <TableCell><Sel name={"belowseatsrightrow"} /></TableCell>
                                            <TableCell><Sel name={"belowseatsrightcol"} /></TableCell>
                                            <TableCell><TextField {...register("pricebelowseatsright")} name="pricebelowseatsright" size="small"/></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                            <div className="formbutton-container">
                                <Button className="formbutton" type="submit" variant="contained" color="primary">add</Button>
                            </div>
                        </form>
                    </FormProvider>
                </Paper>
            </div>
        </div>
    )
}

export default AddMovies
