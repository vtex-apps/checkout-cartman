# Cartman

Cartman is an app that helps you to manage the orderForm in the Cart page.

## Installation

To install Cartman, you can simply run the command below.

```sh
vtex install vtex.checkout-cartman
```

> Note: this version of cartman will only work if your store is using vtex.checkout >=1

## FAQ

### Cartman is not appearing to me, what do I do?!

Hold on, if Cartman is not yet appearing to you when you access the Cart page, there may
be a few reasons for it.

The first one is that you probably don't have the "Call center operator" permission, to
do so, ask someone on your team to give it to you. You can find the permission in the account
admin, inside "Account settings > Account management > Access profiles > Call center operator",
then just insert the email address and wait for a few minutes. You will probably need to clear
out your cookies and reset `localStorage`.

Another reason is that you are accessing the Cart page from an external domain (read: the store
public domain), and not from [https://account-name.myvtex.com/](https://account-name.myvtex.com/),
which is intended! Cartman is setup to only appear if the user is accessing from an internal
domain, so it won't show to the store customers.

If you have an issue with Cartman not appearing in any other condition not mentioned here, please
open an issue or contact us in the #shopping-xp Slack channel.
