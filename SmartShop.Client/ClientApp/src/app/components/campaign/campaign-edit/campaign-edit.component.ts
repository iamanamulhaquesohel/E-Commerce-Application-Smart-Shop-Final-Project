import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { DiscountAmountType, DiscountRuleType } from '../../../models/constants/enum-data';
import { CampaignModel } from '../../../models/data/campaign-model';
import { SubcategoryModel } from '../../../models/data/subcategory-model';
import { NotifyService } from '../../../services/common/notify.service';
import { CampaignService } from '../../../services/data/campaign.service';
import { SubcategoryService } from '../../../services/data/subcategory.service';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {
  //enum options for dropdown
  discountAmountTypeOptions: { label: string, value: number }[] = [];
  discountRuleTypeOptions: { label: string, value: number }[] = [];
  //for new campain
  campaign!: CampaignModel;
  //for sub-category id drop down
  subcategories: SubcategoryModel[] = [];
  constructor(
    private campaignService: CampaignService,
    private subCategoryService: SubcategoryService,
    private notifyService: NotifyService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) { }
  /*
   * Properties
   *
   * */
  get IsAmountRequred(): boolean {
    return this.campaign.discountType == DiscountAmountType.PerOrderAmount;
  }
  get IsMinOrderValueRequired(): boolean {
    return this.campaign.ruleType == DiscountRuleType.MinOrderValue;
  }
  /*
   * Handlers
   *
   * */
  onDiscountTypeChange(event: any) {
    if (event.value == DiscountAmountType.Flat) {
      this.campaign.perOrderValue = 0;
    }
  }
  onRuleTypeChange(event: any) {
    if (event.value == DiscountRuleType.NoRule) {
      this.campaign.minOrderValue = 0;
    }
  }

  save(f: NgForm) {
    this.campaign.startDate = new Date(<string>this.datePipe.transform(this.campaign.startDate, "yyyy-MM-dd", "en-US"));
    this.campaign.endDate = new Date(<string>this.datePipe.transform(this.campaign.endDate, "yyyy-MM-dd", "en-US"));
    this.campaignService.update(this.campaign)
      .subscribe(
        r => {
          f.form.markAsUntouched();
          f.form.markAsPristine();
          this.notifyService.success("Succeded to update campaign", "DISMISS");
        },
        err => {
          this.notifyService.fail("Failed to update campaign", "DISMISS");
          throwError(err.error || err);
        }
      );
  }
  ngOnInit(): void {
    Object.keys(DiscountAmountType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.discountAmountTypeOptions.push({ label: v, value: Number(DiscountAmountType[v]) })
    });
    Object.keys(DiscountRuleType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.discountRuleTypeOptions.push({ label: v, value: Number(DiscountRuleType[v]) })
    });
    //console.log(this.discountRuleTypeOptions);
    this.subCategoryService.get()
      .subscribe(
        r => {
          this.subcategories = r;
          console.log(this.subcategories);
        },
        err => {
          this.notifyService.fail("Failed to load sub-categories", "DISMISS");
          throwError(err.error || err);
        }
    );
    let id: number = this.activatedRoute.snapshot.params.id;
    this.campaignService.getById(id)
      .subscribe(
        r => {
          this.campaign = r;
        },
        err => {
          this.notifyService.fail("Failed to load campaign", "DISMISS");
          throwError(err.error || err);
        }
      );
  }

}
