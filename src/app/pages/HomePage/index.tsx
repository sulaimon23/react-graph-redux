import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
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
import { createSelector } from "reselect";
import { fetchState } from "../../services/selectors";
import { toast } from "react-toastify";
import { Item } from "../../services/types";
//
//

const actionDispatch = (dispatch: Dispatch) => ({
    setItems: (page: any) => dispatch(setItemData(page)),
});
const stateSelector = createSelector(fetchState, (state) => ({
    state,
}));

export function HomePage() {
    const { setItems } = actionDispatch(useAppDispatch());
    const { state } = useAppSelector(stateSelector);
    const [items, setItem] = useState<Array<Item> | null>();
    //
    const fetchItems = async () => {
        await ItemsService.getItems(1, 10)
            .then((res) => {
                setItems(res);
                let data = res as any;
                setItem(data);
            })
            .catch((err) => {
                console.log("Error: ", err);
                toast.error("Error fetching data");
            });
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    async function updateItems(id: any, name: any, description: any) {
        await ItemsService.updateItem({ name, description }, id)
            .then((res: any) => {
                const updatedItems = items?.map((item) => {
                    if (id === item.uuid) {
                        return {
                            ...item,
                            description: description,
                            name: name,
                        };
                    }
                    return item;
                });
                setItem(updatedItems);
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    }

    const handleDeleteItem = async (e: any) => {
        await ItemsService.deleteItem(e)
            .then((res) => {
                setItem(items?.filter((item) => item.uuid !== e));
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    };

    async function addItem(name: any, description: any) {
        await ItemsService.createItem({ name, description })
            .then((res: any) => {
                if (items) {
                    setItem([...items, res]);
                } else {
                    setItem([res]);
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
        //
    }

    async function verifyEmail(): Promise<void> {
        await ItemsService.resendVerificationEmail()
            .then((res: any) => {
                toast.success("Verification email sent");
            })
            .catch((err) => {
                console.log("Error: ", err);
                toast.error("Error sending Verification email");
            });
        //
    }

    const logOut = () => {
        localStorage.clear();
        window.location.reload();
    };

    //
    //
    return (
        <Wrapper>
            {!state?.userData?.user?.email_verified_at && (
                <VerifyEmail verifyEmail={verifyEmail} />
            )}
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
                                    <h2 style={{ textTransform: "capitalize" }}>
                                        {state?.userData?.user?.first_name}{" "}
                                        {state?.userData?.user?.last_name}
                                    </h2>
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
                    {items && items?.length > 0 ? (
                        items?.map((item) => {
                            const editItem = (
                                <EditItem
                                    id={item.uuid}
                                    name={item.name}
                                    description={item.description}
                                    updateItem={updateItems}
                                />
                            );
                            return (
                                <Items
                                    key={item.uuid}
                                    index={item.name}
                                    description={item.description}
                                    editItem={editItem}
                                    deleteItem={(e: any) =>
                                        handleDeleteItem(item.uuid)
                                    }
                                />
                            );
                        })
                    ) : (
                        <h1 style={{ textAlign: "right" }}>
                            Items no available
                        </h1>
                    )}
                </div>
                <DashboardModal addItem={addItem} />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* height: 100vh; */
    width: 100%;
    overflow: hidden

    box-sizing: border-box;
    .items {
        display: inline;
        justify-content: space-between;
        gap: 20px;
        width: 100%;
        padding:10px;
        margin: auto;
        box-sizing: border-box;
        > div {
            width:93%;

            @media screen and (max-width: 770px) {
                width:87%;            
            }
        }
    }
    header {
        background-color: #fff;
        border: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
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
        max-width: 1440px;
        margin: 0 auto;
        position: relative;
        .items {
            margin-top: 32px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            overflow: hidden !important;
            justify-items: center;
            @media screen and (max-width: 1024px) {
                grid-template-columns: 1fr 1fr;
            }
            @media screen and (max-width: 770px) {
                grid-template-columns: 1fr;
                justify-items: left;
                margin-top: 24px;
            }
        }

        @media screen and (max-width: 770px) {
            max-width:98% !important;
            overflow: hidden !important;
        }
    }
    .add-icon {
    }
`;
const MenuText = styled(MenuItem)`
    width: 114px;
`;
