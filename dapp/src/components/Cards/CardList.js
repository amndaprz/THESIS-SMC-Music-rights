import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader'
import Card from 'react-bootstrap/Card';


function CardList(){

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
        } , 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);

    return(
        <Card>
            {loading ? (
                    <ContentLoader
                        width={450}
                        height={140}
                        speed={2}
                        backgroundColor={'#383447'}
                        foregroundColor={'#2B2833'}
                    >
                        <rect x="10" y="16" rx="5" ry="5" width="250" height="12" />
                        <rect x="10" y="48" rx="5" ry="5" width="390" height="12" />
                        <rect x="10" y="110" rx="5" ry="5" width="250" height="12" />
                    </ContentLoader>
                ): (
                    <>
                    <Card.Body>
                        <Card.Title>Track title</Card.Title>
                        <Card.Text className="text_sub">
                            Artist/Label name
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <h5 class="text_sub">Stream count</h5>
                    </Card.Footer>
                    </>
                )}
            
        </Card>
    );
}

export default CardList;