
def cubic(x):
    an = x**3
    return an

#implement here

def my():
	pass
def factorial(x):
    if x<0:
        return 0
    elif x==0:
        return 1
    else:
        return x*factorial(x-1)

def isPrime(x):
    for i in range (2,x/2):
        if (x%i==0):
            return "not prime"
    else:
        return "prime"

n = int(input("Enter the value : "))

def RootCal(x):
    return (x**0.5)

print RootCal(n)

def create_conflict():
    pass
    
def this_is_the_conflict():
    pass