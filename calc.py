#implement here


def isPrime(x):
    for i in range (2,x/2):
        if (x%i==0):
            return "not prime"
    else:
        return "prime"




