# Разработка идеи приложения для отложенного постинга во ВКонтакте (wasted 🗑) 

Здесь я разрабатывал приложение для отложенного постинга в ВК. Но в последний момент выяснилось, 
что это невозможно сделать с сервер-сайда.

Как должно было работать:

* пользователь заполняет форму на сайте;
* время отправки, текст поста и фото отправляются на S3;
* по событию из стороннего сервиса, например, [GitHub Actions](https://docs.github.com/en/actions/quickstart)
вызывается метод API, который определят нужно ли отправлять пост и отправляет, если нужно.


# Nuxt.js Example

This directory is a brief example of a [Nuxt.js](https://nuxtjs.org) app that can be deployed with Vercel and zero configuration.

## Deploy Your Own

Deploy your own Nuxt.js project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/vercel/tree/master/examples/nuxtjs)

_Live Example: https://nuxtjs.now-examples.now.sh_

### How We Created This Example

To get started with Nuxt.js deployed with Vercel, you can use the [Create-Nuxt-App CLI](https://www.npmjs.com/package/create-nuxt-app) to initialize the project:

```shell
$ npx create-nuxt-app my-app
```

> The only change made is to amend the output directory in `nuxt.config.js` to `"/public"`.
