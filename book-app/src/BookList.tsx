import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import BookCard from './BookCard';

interface IBookListProps {
    SearchQuery: (string | null);
    [propName: string]: any;
}

function BookList(props: IBookListProps) {
    const [cards, setCards] = useState<any[]>([])

    useEffect(() => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + props.SearchQuery) 
            .then(response => response.json())
            .then(response => {
                setCards(response.items);
            })
            .catch(console.log);
    }, [props.SearchQuery]);

    function HandleCards() {
        const List = cards.map((item, i) => {
            var thumbnail = '';

            if (!item.volumeInfo.imageLinks) {
                return;
            } else {
                thumbnail = item.volumeInfo.imageLinks.thumbnail;
            }

            return (
                <Grid key={"card_"+i} item sm={6} md={4} lg={3} className="MediaGridCard">
                    <BookCard
                        thumbnail={thumbnail}
                        title={item.volumeInfo.title}
                        authors={item.volumeInfo.authors}
                        description={item.volumeInfo.description}
                    />
                </Grid>
            );
        });
        return List;
    }

    const List = HandleCards();

    return (
        <div className="BookList">
            <Grid container spacing={3} className="MediaGridContainer">
                { List }
            </Grid>
        </div>)
}

export default BookList