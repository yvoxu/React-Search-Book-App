import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

interface IBookCardProps {
  [propName: string]: any;
}

function BookCard(props: IBookCardProps) {
  return (
    <div>
    <Card className="MediaCardContainer">
        <CardActionArea>
            <CardMedia
                className="MediaCardImage"
                image={props.thumbnail}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" >
                    <strong>Title: {props.title}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" >
                    <strong>Author: {props.authors}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription">
                    {props.description}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    </div>
  )
}

export default BookCard