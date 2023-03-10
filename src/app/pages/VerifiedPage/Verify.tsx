import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import VerifiedIcon from "../../../assets/verified.png";
import rightArrow from "../../../assets/right-arrow.svg";
import itemsService from "../../services/itemsService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

//
//
//

export function Verified() {
    let params = useParams();
    const [show, setShow] = useState(false);
    const verifyMe = async (token: string) => {
        await itemsService
            .verifyMe(token)
            .then((res) => {
                setShow(true);
                toast.success("Email verified");
            })
            .catch((err) => {
                console.log("Error: ", err);
                toast.error("User with verification token doest not exist");
            });
    };

    useEffect(() => {
        if (params?.id) {
            verifyMe(params.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Wrapper>
            {show && (
                <div className="container">
                    <div className="verified__card">
                        <img
                            src={VerifiedIcon}
                            alt="verified"
                            className="verified__card-img"
                        />
                        <p>Your email address has been verified.</p>
                        <Link to="/dashboard">
                            Go to Dashboard{" "}
                            <img src={rightArrow} alt="right arrow" />
                        </Link>
                    </div>
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .container {
        width: 720px;
        height: 450px;
        left: 360px;
        top: 159px;
        background: #ffffff;
        border: 1px solid #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        .verified__card {
            display: flex;
            flex-direction: column;
            align-items: center;
            .verified__card-img {
                width: 64px;
                height: 64px;
                margin-bottom: 36px;
            }
            p {
                margin-bottom: 21px;
                font-family: "Montserrat";
                font-style: normal;
                font-weight: 500;
                font-size: 20px;
                line-height: 24px;
                color: #000000;
            }
            a {
                display: flex;
                align-items: center;
                gap: 10px;
                text-decoration: none;
                color: #004cbd;
                font-family: "Montserrat";
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 20px;
                /* identical to box height */
                color: #004cbd;
            }
        }
    }
`;
