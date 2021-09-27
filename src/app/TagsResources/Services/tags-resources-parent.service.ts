import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appTagsResources } from '../models/tags-resources';
import * as xml2js from 'xml2js';
import { environment } from '../../../environments/environment';
import { AbbreviationsAcronyms, ActivityPartner, AstrologyHoroscope, AttractionCrushes, BusinessPartner, CareerOpportunities, ChemistryConnection, DatingCourtship, Extras, FlirtingSeducing, FriendsAcquaintances, GaysLesbians, HarmonyCompatibility, HeartbreaksBreakups, HookupsAffairs, idioms, InfidelityCheating, JustFriends, LifeStyle, LongRelationship, LovaRomanceImages, MarriageWedding, OpenRelationship, QuotesSayings, RelationshipCommitment, SexIntimacy, ShortRelationship, SinglesUnattached, SpousesCouples, VirtualRelationship } from 'Shared/models/general-lists';
@Injectable({
  providedIn: 'root'
})
export class TagsResourcesParentService {
  originalList: any = [];
  articlesList = [];
  list: any = [];
  imagesUrls: any = [];
  imageUrl: string = '';
  TagsResourcesObject: appTagsResources;
  counter: number = 1;
  constructor(private http: HttpClient, private url: string) {
  }
  //this fun for test calling the api from angular without database
  //01-09-2021
  GetWeatherForecast() {
    return this.http.get(environment.BASE_URL + '/WeatherForecast');
  }
  GetUserProfile() {
    return this.http.get(environment.BASE_URL + '/Profile/96');
  }
  getList() {
    return this.http.get(this.url, { responseType: 'text' });
  }
  getAll(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }
  parseXML(data, isQuotes?: boolean) {
    return new Promise(resolve => {
      var k: string | number,
        arr: any = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      this.clearList(arr);
      parser.parseString(data, function (err, result) {
        var obj = result.Items;
        if (isQuotes) {
          for (k in obj.Item) {
            var item = obj.Item[k];
            arr.push({
              id: k,
              title: item.title[0],
              description: item.description[0],
              image: ''
            });
          }
        }
        else {
          for (k in obj.Item) {
            var item = obj.Item[k];
            arr.push({
              id: k,
              title: item.title[0],
              description: item.description[0],
              body: item.body[0],
              image: '',
              date: item.date[0],
              authors: item.authors[0]
            });
          }
        }
        resolve(arr);
        console.log('From xml Parder>>' + arr);
      });
    });
  }
  parseFooterXml(data) {
    return new Promise(resolve => {
      var k: string | number,
        arr: any = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      this.clearList(arr);
      parser.parseString(data, function (err, result) {
        var obj = result.Items;
        for (k in obj.Item) {
          var item = obj.Item[k];
          arr.push({
            title: item.title[0],
            body: item.body[0],
          });
        }
        resolve(arr);
        console.log('From footer xml parser>>' + arr);
      });
    });
  }
  getRandomImage(catName?: string) {
    switch (catName) {
      case "Love-Romance":
        this.imageUrl = LovaRomanceImages[Math.floor(Math.random() * LovaRomanceImages.length)];
        break;
      case "Dating-Courtship":
        this.imageUrl = DatingCourtship[Math.floor(Math.random() * DatingCourtship.length)];
        break;
      case "Abbreviations-Acronyms":
        this.imageUrl = AbbreviationsAcronyms[Math.floor(Math.random() * AbbreviationsAcronyms.length)];
        break;
      case "Activity-Partner":
        this.imageUrl = ActivityPartner[Math.floor(Math.random() * ActivityPartner.length)];
        break;
      case "Astrology-Horoscope":
        this.imageUrl = AstrologyHoroscope[Math.floor(Math.random() * AstrologyHoroscope.length)];
        break;
      case "Attraction-Crushes":
        this.imageUrl = AttractionCrushes[Math.floor(Math.random() * AttractionCrushes.length)];
        break;
      case "Business-Partner":
        this.imageUrl = BusinessPartner[Math.floor(Math.random() * BusinessPartner.length)];
        break;
      case "Career-Opportunities":
        this.imageUrl = CareerOpportunities[Math.floor(Math.random() * CareerOpportunities.length)];
        break;
      case "Chemistry-Connection":
        this.imageUrl = ChemistryConnection[Math.floor(Math.random() * ChemistryConnection.length)];
        break;
      case "extras-extras":
        this.imageUrl = Extras[Math.floor(Math.random() * Extras.length)];
        break;
      case "Flirting-Seducing":
        this.imageUrl = FlirtingSeducing[Math.floor(Math.random() * FlirtingSeducing.length)];
        break;
      case "Friends-Acquaintances":
        this.imageUrl = FriendsAcquaintances[Math.floor(Math.random() * FriendsAcquaintances.length)];
        break;
      case "Gays-Lesbians":
        this.imageUrl = GaysLesbians[Math.floor(Math.random() * GaysLesbians.length)];
        break;
      case "Harmony-Compatibility":
        this.imageUrl = HarmonyCompatibility[Math.floor(Math.random() * HarmonyCompatibility.length)];
        break;
      case "Heartbreaks-Breakups":
        this.imageUrl = HeartbreaksBreakups[Math.floor(Math.random() * HeartbreaksBreakups.length)];;
        break;
      case "Spouses-Couples":
        this.imageUrl = HeartbreaksBreakups[Math.floor(Math.random() * HeartbreaksBreakups.length)];
        break;
      case "Hookups-Affairs":
        this.imageUrl = HookupsAffairs[Math.floor(Math.random() * HookupsAffairs.length)];
        break;
      case "Idioms-Proverbs":
        this.imageUrl = idioms[Math.floor(Math.random() * idioms.length)];
        break;
      case "Infidelity-Cheating":
        this.imageUrl = InfidelityCheating[Math.floor(Math.random() * InfidelityCheating.length)];
        break;
      case "Just-Friends":
        this.imageUrl = JustFriends[Math.floor(Math.random() * JustFriends.length)];
        break;
      case "life-style":
        this.imageUrl = LifeStyle[Math.floor(Math.random() * LifeStyle.length)];
        break;
      case "Long-Relationship":
        this.imageUrl = LongRelationship[Math.floor(Math.random() * LongRelationship.length)];
        break;
      case "Marriage-Wedding":
        this.imageUrl = MarriageWedding[Math.floor(Math.random() * MarriageWedding.length)];
        break;
      case "Open-Relationship":
        this.imageUrl = OpenRelationship[Math.floor(Math.random() * OpenRelationship.length)];
        break;
      case "Quotes-Sayings":
        this.imageUrl = QuotesSayings[Math.floor(Math.random() * QuotesSayings.length)];
        break;
      case "Relationship-Commitment":
        this.imageUrl = RelationshipCommitment[Math.floor(Math.random() * RelationshipCommitment.length)];
        break;
      case "Sex-Intimacy":
        this.imageUrl = SexIntimacy[Math.floor(Math.random() * SexIntimacy.length)];
        break;
      case "Short-Relationship":
        this.imageUrl = ShortRelationship[Math.floor(Math.random() * ShortRelationship.length)];
        break;
      case "Singles-Unattached":
        this.imageUrl = SinglesUnattached[Math.floor(Math.random() * SinglesUnattached.length)];
        break;
      case "Virtual-Relationship":
        this.imageUrl = VirtualRelationship[Math.floor(Math.random() * VirtualRelationship.length)];
        break;
    }
    return this.imageUrl;
  }
  getImagesListsByCat(catName: string) {
    switch (catName) {
      case "Love-Romance":
        this.imagesUrls = LovaRomanceImages;
        break;
      case "Abbreviations-Acronyms":
        this.imagesUrls = AbbreviationsAcronyms;
        break;
      case "Activity-Partner":
        this.imagesUrls = ActivityPartner;
        break;
      case "Astrology-Horoscope":
        this.imagesUrls = AstrologyHoroscope;
        break;
      case "Attraction-Crushes":
        this.imagesUrls = AttractionCrushes;
        break;
      case "Business-Partner":
        this.imagesUrls = BusinessPartner;
        break;
      case "Career-Opportunities":
        this.imagesUrls = CareerOpportunities;
        break;
      case "Chemistry-Connection":
        this.imagesUrls = ChemistryConnection;
        break;
      case "Dating-Courtship":
        this.imagesUrls = DatingCourtship;
        break;
      case "Extras-Extras":
        this.imagesUrls = Extras;
        break;
      case "Flirting-Seducing":
        this.imagesUrls = FlirtingSeducing;
        break;
      case "Friends-Acquaintances":
        this.imagesUrls = FriendsAcquaintances;
        break;
      case "Gays-Lesbians":
        this.imagesUrls = GaysLesbians;
        break;
      case "Harmony-Compatibility":
        this.imagesUrls = HarmonyCompatibility;
        break;
      case "Heartbreaks-Breakups":
        this.imagesUrls = HeartbreaksBreakups;
        break;
      case "Hookups-Affairs":
        this.imagesUrls = HookupsAffairs;
        break;
      case "Idioms-Proverbs":
        this.imagesUrls = idioms;
        break;
      case "Infidelity-Cheating":
        this.imagesUrls = InfidelityCheating;
        break;
      case "Just-Friends":
        this.imagesUrls = JustFriends;
        break;
      case "Life-Style":
        this.imagesUrls = LifeStyle;
        break;
      case "Long-Relationship":
        this.imagesUrls = LongRelationship;
        break;
      case "Marriage-Wedding":
        this.imagesUrls = MarriageWedding;
        break;
      case "Open-Relationship":
        this.imagesUrls = OpenRelationship;
        break;
      case "Quotes-Sayings":
        this.imagesUrls = QuotesSayings;
        break;
      case "Relationship-Commitment":
        this.imagesUrls = RelationshipCommitment;
        break;
      case "Sex-Intimacy":
        this.imagesUrls = SexIntimacy;
        break;
      case "short-relation-ship":
        this.imagesUrls = ShortRelationship;
        break;
      case "Singles-Unattached":
        this.imagesUrls = SinglesUnattached;
        break;
      case "Spouses-Couples":
        this.imagesUrls = SpousesCouples;
        break;
      case "Virtual-Relationship":
        this.imagesUrls = VirtualRelationship;
        break;
    }
    this.imagesUrls = this.imagesUrls.reverse();
    return this.imagesUrls;
  }
  getReadthisAndRelatedArticles(articles: any[], title: string) {
    this.clearList(this.articlesList);//clear the articlesList
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].title != title) {
        this.articlesList.push(articles[i]);
      }
    }
    return this.articlesList;
  }
  getByTitle(articles, articleTitle: string) {
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].title == articleTitle) {
        console.log("found title> " + articles[i].title + " -- " + " Sent title> " + articleTitle);
        this.TagsResourcesObject = articles[i];
        console.log("TagsResourcesObject >> " + this.TagsResourcesObject.body);
      }
    }
    return this.TagsResourcesObject;
  }
  clearList(list: any[]) {
    if (list.length > 0) {
      list.length = 0;
    }
  }
}
