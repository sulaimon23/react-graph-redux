import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import ItemsService from "../../services/itemsService";
import { setItemData } from "../../services/dataSlice";
import Items from "../../components/Items";
import { AiFillCaretDown } from "react-icons/ai";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import DashboardModal from "../../components/DashboardModal";
import EditItem from "../../components/EditItem";
import VerifyEmail from "../../components/VerifyEmail";
//
//

const actionDispatch = (dispatch: Dispatch) => ({
    setItems: (page: any) => dispatch(setItemData(page)),
});

export function HomePage() {
    const { setItems } = actionDispatch(useAppDispatch());

    const fetchItems = async () => {
        const items = await ItemsService.getItems(1, 10).catch((err) => {
            console.log("Error: ", err);
        });

        console.log("Anime page: ", items);
        if (items) setItems(items);
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [items, setItem] = useState<any>([
        {
            id: 1,
            name: "Item 1",
            description:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        },
        {
            id: 2,
            name: "Item 2",
            description:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        },
        {
            id: 3,
            name: "Item 3",
            description:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        },
    ]);

    function updateItems(id: any, name: any, description: any) {
        const updatedItems = items.map((item: { id: any }) => {
            if (id === item.id) {
                return { ...item, description: description, name: name };
            }
            return item;
        });
        setItem(updatedItems);
    }

    const handleDeleteItem = (e: any) => {
        setItem(items.filter((item: { id: any }) => item.id !== e));
    };

    function addItem(name: any, description: any) {
        const item = {
            id: "id",
            name: name,
            description: description,
        };
        setItem([...items, item]);
    }

    const logOut = () => {
        localStorage.clear();
    };

    //
    //
    return (
        <Wrapper>
            <VerifyEmail />
            <header>
                <h1>Dashboard</h1>

                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState: any) => (
                        <React.Fragment>
                            <Button
                                {...bindTrigger(popupState)}
                                sx={{ textTransform: "none" }}
                            >
                                <div className="profile">
                                    <h2>John Jones</h2>
                                    <AiFillCaretDown
                                        style={{ color: "#000" }}
                                    />
                                </div>
                            </Button>
                            <Menu
                                onClick={() => logOut()}
                                {...bindMenu(popupState)}
                            >
                                <MenuText>Log Out</MenuText>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </header>
            <div className="container">
                <div className="items">
                    {items.map(
                        (item: {
                            id: React.Key | null | undefined;
                            name: any;
                            description: any;
                        }) => {
                            const editItem = (
                                <EditItem
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    updateItem={updateItems}
                                />
                            );
                            return (
                                <Items
                                    key={item.id}
                                    index={item.name}
                                    description={item.description}
                                    editItem={editItem}
                                    deleteItem={(e: any) =>
                                        handleDeleteItem(item.id)
                                    }
                                />
                            );
                        }
                    )}
                </div>

                <DashboardModal addItem={addItem} />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* height: 100vh; */
    header {
        background-color: #fff;
        border: 1px solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        padding: 25px 55px 27px 58px;
        @media screen and (max-width: 770px) {
            padding: 25px 25px 27px 25px;
        }
        .profile {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        h1 {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            /* identical to box height */
            color: #000000;
        }
        h2 {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            margin-right: 15px;
            /* identical to box height */
            color: #131415;
        }
    }
    .container {
        margin: 32px 58px;
        max-width: 1480px;
        margin: 0 auto;
        position: relative;
        .items {
            margin-top: 32px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            justify-items: center;
            @media screen and (max-width: 1024px) {
                grid-template-columns: 1fr 1fr;
            }
            @media screen and (max-width: 770px) {
                grid-template-columns: 1fr;
                margin-top: 24px;
            }
        }
    }
    .add-icon {
    }
`;
const MenuText = styled(MenuItem)`
    width: 114px;
`;
