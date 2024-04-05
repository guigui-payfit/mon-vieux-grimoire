# "Mon Vieux Grimoire" website

This is the seventh project (P7) of the OpenClassrooms web developer training.

## How to start the app

Copy the content from the file `api/.env.example` to a new file `api/.env`.

Open [Docker Desktop](https://www.docker.com/products/docker-desktop) on your machine.

Then run the following command at the root of the "mon-vieux-grimoire" folder:

```
npm start
```

Once everything is built (you can follow the progression in the Docker container logs), you can see "Mon Vieux Grimoire" website on your web browser here: http://localhost:3000.
You can also explore the database with a Mongo GUI (Graphic User Interface) like "MongoDB Compass", by setting the following connection string: `mongodb://root:password@localhost:27017/`.

Finally, you can close all the "mon-vieux-grimoire" stack by running the following command at the root of the "mon-vieux-grimoire" folder:

```
npm stop
```

## External links

- [API technical specifications](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf)
- [Website mock-ups on Figma](https://www.figma.com/file/Snidyc45xi6qchoOPabMA9/Maquette-Mon-Vieux-Grimoir?type=design&node-id=0-1&mode=design&t=fCp69wnbZfNJGsOK-0)
- [Functional specifications](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+fonctionnelles.pdf)

## Notes

The API technical specification document mentions that a created book must have an empty array as "ratings" and an average rating equal to 0. This is inconsistent with the possibility to rate the book in the book creation form.
As a consequence, if a rate is given at the book creation, then it will be added to the book ratings and the average rating will be equal to the given rate.
