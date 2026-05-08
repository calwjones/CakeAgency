# Cake Agency Tech Test

node script that fetches orders from the test API and prints the average order value to two decimal places.

## How to Run
node solution.js

needs node 18+ since it uses the built-in fetch.

## How It Works

### Fetching the Data
the script hits the orders endpoint. the API gives a 500 error 1 in every 10 calls, so if a request comes back with one the script retries it up to 10 times with a 500ms wait between attempts. if all 10 fail it gives up and exits with an error in order to not have an infinite loop, rather than carrying on without any data. 

### Calculating the Total
each item's price comes back as a string ("563.00") rather than a number, so I parse them with parseFloat before summing.

### Calculating the Average
sums every order's total and divides by the number of orders. if the API returns an empty list of orders the script prints a message and exits without dividing by zero.

### Output
the result is printed to stdout. any warnings or errors get sent to stderr so they don't get mixed in with the actual answer.