- [Driver Script](#driver-script)
  - [Prerequisite (for Mac)](#prerequisite-for-mac)
  - [Prerequisite (for Windows)](#prerequisite-for-windows)
  - [Usage](#usage)
  
# Driver Script

This is a script that lets you add drivers, trips, and generate reports

I decided to make a "model" for the Driver data type. A Driver has one assocation, a trip. And a Driver can have many trips. To model the Driver I thought about it in the paradigm of "noun and verb". The noun being the driver instance, and the verbs being what the driver instance can do.

In the index.js file I included what I consider to be "utility functions", or "helpers". These are functions that can be run from anywhere to get data (generateAllDriversReport) and create/update data (createDriver, addDriverTip). I needed to create these to be able to access the driver instance that was created and update the driver's data accordingly.

The last function is generateAllDriversReport. This is a bit more hefty in terms of its responsibilty, but I imagine this could be used, for instance in GraphQL, as a query that can then spit out this data into a nice visual report. 


## Prerequisite (for Mac)

Use the package manager [brew](https://brew.sh/) to install node.

```bash
> brew update
> brew install node
```

## Prerequisite (for Windows)

Use the [windows installer](https://nodejs.org/en/download/) to install node

## Usage

```bash
> node index.js
```

