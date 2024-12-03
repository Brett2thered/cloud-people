import { ReactNode } from 'react';
import React from 'react';
import Link from 'next/link';

import './login.styles.css';
import { AuthenticationButton } from '@components/utils/auth-button/auth-button';
import { loginOrSignUp } from '@lib/actions/authentication-actions';
import { SocialLoginButton } from '@components/utils/social-login/social-login-button';

const LoginPage = async ({ searchParams }: { searchParams: Promise<{ message: string }> }): Promise<ReactNode> => {
    const { message } = await searchParams;

    return (
        <div className="login-container">
            <div className="banner">
                <svg width="292" height="189" viewBox="0 0 292 189" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" fill="white"
                        d="M291.628 119.176C291.628 151.492 269.326 178.599 239.273 185.944C237.599 186.535 235.867 187.109 234.08 187.666L234.563 187.502L234.452 187.428C233.215 187.928 231.863 188.203 230.447 188.203C224.543 188.203 219.757 183.417 219.757 177.513C219.757 177.469 219.757 177.425 219.758 177.38V136.591C219.758 127.746 212.588 120.577 203.744 120.577C194.9 120.577 187.73 127.746 187.73 136.591V170.263H187.727C187.728 170.333 187.729 170.403 187.729 170.474C187.729 176.378 182.943 181.164 177.039 181.164C171.135 181.164 166.349 176.378 166.349 170.474C166.349 170.403 166.35 170.333 166.351 170.263H166.35V121.659C166.35 110.64 157.417 101.707 146.398 101.707C135.379 101.707 126.446 110.64 126.446 121.659V170.263H126.443C126.444 170.333 126.445 170.403 126.445 170.474C126.445 176.378 121.658 181.164 115.755 181.164C109.851 181.164 105.065 176.378 105.065 170.474C105.065 170.402 105.065 170.33 105.067 170.259V136.591C105.067 127.746 97.8971 120.577 89.053 120.577C80.2088 120.577 73.0392 127.746 73.0392 136.591V177.799L73.0334 177.803C72.8796 183.573 68.1541 188.203 62.3473 188.203C61.2816 188.203 60.2523 188.047 59.2811 187.757L58.9625 187.987C56.8028 187.33 54.7216 186.648 52.7236 185.944C22.6722 178.597 0.371094 151.491 0.371094 119.176C0.371094 83.1618 28.0709 53.6169 63.328 50.6844C78.6571 20.6028 109.922 0 145.999 0C182.076 0 213.341 20.6027 228.671 50.6843C263.928 53.6164 291.628 83.1614 291.628 119.176ZM89.1741 115.068C100.26 115.068 109.248 106.081 109.248 94.9944C109.248 83.9081 100.26 74.9209 89.1741 74.9209C78.0878 74.9209 69.1007 83.9081 69.1007 94.9944C69.1007 106.081 78.0878 115.068 89.1741 115.068ZM172.949 67.9795C172.949 82.864 160.882 94.9303 145.998 94.9303C131.113 94.9303 119.047 82.864 119.047 67.9795C119.047 53.095 131.113 41.0287 145.998 41.0287C160.882 41.0287 172.949 53.095 172.949 67.9795ZM202.822 115.068C213.908 115.068 222.895 106.081 222.895 94.9944C222.895 83.9081 213.908 74.9209 202.822 74.9209C191.735 74.9209 182.748 83.9081 182.748 94.9944C182.748 106.081 191.735 115.068 202.822 115.068Z" />
                </svg>
                <h1 className="font-head">Cloud People</h1>
            </div>
            <div className="form-area">
                <div className="login-form-wrapper">
                    <h2>Running your business from the clouds</h2>
                    <form className="login-form">
                        <input className="input" placeholder="Email" id="email" name="email" type="email" required />
                        <div className="agreement-wrapper">
                            <label htmlFor="agreement" className="agreement-label">
                                <input className="agreement-checkbox" type="checkbox" id="agreement" name="agreement" />
                                I agree to DopeSass<Link href="#">Terms of Service</Link>and{' '}
                                <Link href="#">Privacy Policy</Link>
                            </label>
                        </div>
                        <AuthenticationButton className="submit-button"
                            formAction={loginOrSignUp}
                            buttonType="submit" />
                    </form>
                    <div className="separating-area">
                        <div className="w-full">
                            <hr />
                        </div>
                        <div>
                            <span className="text-md text-color-light">or</span>
                        </div>
                        <div className="w-full">
                            <hr />
                        </div>
                    </div>
                    <div className="social-login-area">
                        <SocialLoginButton provider="google">
                            <span>
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_618_2904)">
                                        <path fill="currentColor"
                                            d="M19.3147 9.71894C19.3147 9.07316 19.2623 8.42389 19.1506 7.78857H10.1899V11.4469H15.3213C15.1084 12.6267 14.4242 13.6704 13.4224 14.3337V16.7074H16.4837C18.2815 15.0528 19.3147 12.6093 19.3147 9.71894Z" />
                                        <path fill="currentColor"
                                            d="M10.1899 19.0009C12.7521 19.0009 14.9128 18.1596 16.4871 16.7075L13.4258 14.3338C12.574 14.9132 11.4745 15.2414 10.1934 15.2414C7.71496 15.2414 5.61354 13.5693 4.85954 11.3213H1.70044V13.7683C3.31315 16.9763 6.59792 19.0009 10.1899 19.0009Z" />
                                        <path fill="currentColor"
                                            d="M4.85612 11.3211C4.45818 10.1413 4.45818 8.86368 4.85612 7.68381V5.23682H1.70051C0.353087 7.92118 0.353087 11.0838 1.70051 13.7681L4.85612 11.3211Z" />
                                        <path fill="currentColor"
                                            d="M10.1899 3.76015C11.5443 3.7392 12.8533 4.24885 13.8342 5.18436L16.5465 2.47207C14.829 0.859358 12.5496 -0.0272856 10.1899 0.000640194C6.59792 0.000640194 3.31315 2.02526 1.70044 5.23672L4.85605 7.68372C5.60656 5.4322 7.71146 3.76015 10.1899 3.76015Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_618_2904">
                                            <rect width="19" height="19" fill="white" transform="translate(0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Continue with Google
                            </span>
                        </SocialLoginButton>
                        <SocialLoginButton provider="apple">
                            <span>
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_618_2911)">
                                        <path fill="currentColor"
                                            d="M17.7519 14.8068C17.4646 15.4706 17.1244 16.0816 16.7304 16.6434C16.1932 17.4092 15.7534 17.9393 15.4145 18.2337C14.8891 18.7169 14.3261 18.9644 13.7233 18.9784C13.2905 18.9784 12.7687 18.8553 12.1611 18.6055C11.5516 18.3568 10.9915 18.2337 10.4793 18.2337C9.9422 18.2337 9.36612 18.3568 8.74993 18.6055C8.1328 18.8553 7.63565 18.9855 7.25554 18.9984C6.67747 19.023 6.10127 18.7685 5.52613 18.2337C5.15904 17.9135 4.69989 17.3647 4.14985 16.5871C3.55969 15.7567 3.0745 14.7939 2.6944 13.6961C2.28732 12.5104 2.08325 11.3622 2.08325 10.2507C2.08325 8.97735 2.35839 7.87914 2.90949 6.95884C3.34261 6.21962 3.9188 5.6365 4.63996 5.20843C5.36112 4.78035 6.14033 4.56221 6.97947 4.54825C7.43862 4.54825 8.04073 4.69028 8.78898 4.96941C9.53512 5.24947 10.0142 5.3915 10.2243 5.3915C10.3813 5.3915 10.9135 5.22543 11.8157 4.89435C12.669 4.58731 13.3891 4.46018 13.979 4.51026C15.5775 4.63926 16.7785 5.26941 17.5771 6.40469C16.1475 7.27092 15.4403 8.48418 15.4544 10.0406C15.4673 11.2529 15.9071 12.2618 16.7714 13.0628C17.1631 13.4346 17.6006 13.7219 18.0873 13.926C17.9818 14.2321 17.8703 14.5253 17.7519 14.8068ZM14.0857 0.380108C14.0857 1.33033 13.7386 2.21754 13.0466 3.03874C12.2116 4.01498 11.2016 4.5791 10.1063 4.49008C10.0923 4.37609 10.0842 4.25611 10.0842 4.13003C10.0842 3.21782 10.4813 2.24158 11.1865 1.44337C11.5386 1.03922 11.9864 0.703181 12.5294 0.435112C13.0712 0.171044 13.5837 0.025008 14.0658 0C14.0798 0.127029 14.0857 0.254066 14.0857 0.380096V0.380108Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_618_2911">
                                            <rect width="19" height="19" fill="currentColor"
                                                transform="translate(0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Continue with Apple
                            </span>
                        </SocialLoginButton>
                    </div>
                    {message && <p className="display-message">{message}</p> || null}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
