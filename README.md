# Welcome to my Fullstack User Access Application

This project is a web based application with React Javascript powering the Frontend and Firebase used to develop its Backend and Database mangement system,
please feel free to acesss the code base to observe the code architecture.

# React
React is a JavaScript library developed by Facebook which, among other things, was used to build Instagram.com. Its aim is to allow developers to easily create fast user interfaces for websites and applications alike. The main concept of React. js is virtual DOM.

# Firebase
The Firebase Realtime Database lets you build rich, collaborative applications by allowing secure access to the database directly from client-side code. Data is persisted locally, and even while offline, realtime events continue to fire, giving the end user a responsive experience.

# Databse dump
Firease provides a Nosql databse structure for its documents, for this  I created a "sectors" collection which inturn holds the respective sector's it sef in an array  style format, same thing applies to the "Users" collection which holds data in an object style format:
setors -> NNcXCtpBnh8c6a21wJv1 -> [
                                     "Manufacturing",
                                     "Food and Beverages"
                                     "furniture",
                                     "Aluminium"
                                  ]
Users -> TzNT4CkY7CfNaILrkRPY -> [
                                    {
                                      nmae: "Segun",
                                      sector: "Manufacturing",
                                      termsAgreement: true
                                    },
                                    {
                                      name: "ben"
                                      sector: "furniture",
                                      termsAgreement: true
                                    }
                                 ]

![Alt text](/public/assets/img-1.png?raw=true "Title")

![Alt text](/public/assets/img-2.png?raw=true "Title")