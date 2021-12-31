import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  Box,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Heading,
  Text,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import DestinationHotel from "./../DestinationHotel";
import DestinationTouristGuides from "./../DestinationTouristGuides";
import DestinationTransportation from "./../DestinationTransportation";
import DestinationFlights from "./../DestinationFlights";
import DestinationCost from "./../DestinationCost";
import Comments from "./../Comments";
import { useParams } from "react-router-dom";
import CardInHome from "../CardInHome";
import { useDispatch, useSelector } from "react-redux";
import {
  hotelRedux,
  transportationRedux,
  flightRedux,
  touristGuideRedux,
  destinationRedux,
} from "./../../reducers/order";

//import { AccordionIcon } from "@chakra-ui/icons";

export default function DestinationInfo() {
  const { id, city } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state;
  });

  const [destination, setDestination] = useState({});
  useEffect(() => {
    getItem();

    const data = {
      destination,
    };

    dispatch(destinationRedux(data));

    //console.log(state.setOrder.destination);
  }, []);

  const getItem = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/destinations/getDestinationById/${id}`
      );

      setDestination(result.data);
      //console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Tabs variant="enclosed" margin="5%">
        <TabList>
          <Tab>عن الرحلة</Tab>
          <Tab>خطة الوجهة</Tab>
          <Tab>الحجز</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {destination.result ? (
              <Center>
                <Grid
                  marginTop="10%"
                  w="90%"
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(2, 1fr)"
                  shadow="md"
                  borderWidth="1px"
                  padding="3"
                  bg="white"
                >
                  <GridItem colSpan={1}>
                    <Image
                      src={destination.result.image}
                      alt="wjhat"
                      w="100%"
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Box p={7}>
                      <Heading fontSize="xl">{destination.result.name}</Heading>
                      <Text mt={4}>{destination.result.desc}</Text>
                    </Box>
                  </GridItem>
                </Grid>
              </Center>
            ) : (
              <></>
            )}
          </TabPanel>
          <TabPanel>
            {destination.festivals ? (
              <Accordion defaultIndex={[0]} allowMultiple>
                {destination.festivals.map((item, index) => {
                  return (
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="right">
                            اليوم {index + 1}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <CardInHome
                          name={item.name}
                          text={item.desc}
                          image={item.imge}
                          link={item.map}
                        />

                        {/* <Image src={item.imge} alt={item.name} />
                        <Heading> {item.name}</Heading>
                        <Text>{item.desc}</Text>
                        <h1>{item.cost}</h1>
                        <h1>{item.map}</h1> */}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <></>
            )}
          </TabPanel>

          <TabPanel>
            <DestinationHotel city={city} />
            <DestinationTouristGuides
              city={city === "بريدة" ? "القصيم" : city}
            />
            <DestinationTransportation city={city} />
            <DestinationFlights city={city} />
            <p>التكلفة الكلية</p>
            <DestinationCost city={city} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Comments id={id} />
    </div>
  );
}
