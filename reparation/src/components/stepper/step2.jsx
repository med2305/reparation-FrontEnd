import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';
import { blue } from '@mui/material/colors';
import categoriesData from '../data/data.json'; // replace with the path to your JSON file
import PrintIcon from '@mui/icons-material/Print';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ComputerIcon from '@mui/icons-material/Computer';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import WatchIcon from '@mui/icons-material/Watch';

const StyledCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(1),
    width: '180px',
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    '&.selected': {
        backgroundColor: blue[500],
    },
}));

const CardContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
});

const StepTwo = () => {
    const [selectedCard, setSelectedCard] = React.useState(null);

    // const images = {
    //     'hp.png': hpLogo,
    //     // Add the rest of your images here
    // };
    const icons = {
        'imprimantes': <PrintIcon />,
        'phones': <PhoneAndroidIcon />,
        'computers': <ComputerIcon />,
        'tablettes': <TabletAndroidIcon />,
        'watches': <WatchIcon />,
    };
    const handleCardClick = (cardIndex) => {
        setSelectedCard(cardIndex);
        localStorage.setItem('category', categoriesData.categories[cardIndex].name);
    };

    return (
        <CardContainer>
            {categoriesData.categories.map((category, index) => (
                <div key={index}>
                    <StyledCard
                        onClick={() => handleCardClick(index)}
                        className={selectedCard === index ? 'selected' : ''}
                    >
                        <CardContent>
                            {React.cloneElement(icons[category.name], { style: { fontSize: '4em' } })}
                        </CardContent>
                    </StyledCard>
                    <p style={{ textAlign: 'center', margin: '0 auto' }}>{category.name}</p>
                </div>
            ))}
        </CardContainer>
    );
};

export default StepTwo;