#implement here
def factorial(x):
    if x<0:
        return 0
    elif x==0:
        return 1
    else:
        return x*factorial(x-1)
